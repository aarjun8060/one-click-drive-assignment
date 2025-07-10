import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { authSchema } from "@/types/validations/auth";
import { prisma } from "@/lib/prisma";
import { generateToken, verifyPassword } from "@/utils/auth";
import { LS_KEY, RESPONSE_STATUS, RESPONSE_STATUS_CODE } from "@/constants";

// Create Rate limit - 5 requests per 60 seconds
const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.fixedWindow(5, "60s"),
});

export async function POST(req: NextRequest) {
  try {
    const headersList = await headers();
    if (process.env.NODE_ENV !== "development") {
      // Apply rate limiting based on the request IP
      const ip = headersList.get("x-forwarded-for") ?? "anonymous";
      const { success, limit, reset, remaining } = await ratelimit.limit(ip);

      // Block the request if rate limit exceeded
      if (!success) {
        return new Response("Rate limit exceeded. Please try again later.", {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          },
        });
      }
    }

    const body = await req.json();

    const { email, password } = authSchema.parse(body);

    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Email and password are required",
          status: RESPONSE_STATUS.validationError,
          statusCode: RESPONSE_STATUS_CODE.validationError,
        },
        { status: RESPONSE_STATUS_CODE.validationError }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
          status: RESPONSE_STATUS.recordNotFound,
          statusCode: RESPONSE_STATUS_CODE.badRequest,
        },
        { status: RESPONSE_STATUS_CODE.badRequest }
      );
    }

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          message: "Invalid password",
          status: RESPONSE_STATUS.failure,
          statusCode: RESPONSE_STATUS_CODE.unAuthorized,
        },
        { status: RESPONSE_STATUS_CODE.unAuthorized }
      );
    }

    const userId = user.id;
    const token = await generateToken({ userId });

    // Set the token in a cookie
    const cookieStore = await cookies();
    cookieStore.set({
      name: LS_KEY.auth_token,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return NextResponse.json(
      {
        message: "Login successful",
        status: RESPONSE_STATUS.success,
        statusCode: RESPONSE_STATUS_CODE.success,
      },
      { status: RESPONSE_STATUS_CODE.success }
    );
  } catch (error) {
    console.error("Error in POST /api/admin/auth:", error);
    return NextResponse.json(
      {
        status: RESPONSE_STATUS.serverError,
        message: "Internal server error",
      },
      { status: RESPONSE_STATUS_CODE.internalServerError }
    );
  }
}
