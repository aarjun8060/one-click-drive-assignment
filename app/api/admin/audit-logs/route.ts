import { RESPONSE_STATUS, RESPONSE_STATUS_CODE } from "@/constants";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { verifyToken } from "@/utils/auth";

export const GET = async (request: NextRequest) => {
  try {
    const headersList = await headers();
    const token = headersList.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        {
          status: RESPONSE_STATUS.unauthorized,
          message: "Unauthorized access, token is missing",
        },
        { status: RESPONSE_STATUS_CODE.unAuthorized }
      );
    }

    const decodedToken = await verifyToken(token);

    if (!decodedToken || !decodedToken.userId) {
      return NextResponse.json(
        {
          status: RESPONSE_STATUS.unauthorized,
          message: "Unauthorized access, invalid token",
        },
        { status: RESPONSE_STATUS_CODE.unAuthorized }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken?.userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          status: RESPONSE_STATUS.recordNotFound,
          message: "User not found",
        },
        { status: RESPONSE_STATUS_CODE.badRequest }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get("pageSize") || "10")));
    const skip = (page - 1) * pageSize;

    const auditLogs = await prisma.auditLog.findMany({
      include: {
        admin: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        car: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: pageSize,
    });

    const totalCount = await prisma.auditLog.count();
    if (!auditLogs || auditLogs.length === 0) {
      return NextResponse.json(
        {
          status: RESPONSE_STATUS.recordNotFound,
          message: "No audit logs found",
        },
        { status: RESPONSE_STATUS_CODE.badRequest }
      );
    }

    const totalPages = Math.ceil(totalCount / pageSize);
    return NextResponse.json(
      {
        status: RESPONSE_STATUS.success,
        message: "Audit logs fetched successfully",
        data: auditLogs,
        pagination: {
          page,
          pageSize,
          totalCount,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      },
      { status: RESPONSE_STATUS_CODE.success }
    );
  } catch (error) {
    console.error("Error in GET /api/admin/car:", error);
    return NextResponse.json(
      {
        status: RESPONSE_STATUS.serverError,
        message: "Internal server error",
      },
      { status: RESPONSE_STATUS_CODE.internalServerError }
    );
  }
};
