import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { LS_KEY } from "./constants";

export async function middleware(request: NextRequest) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get(LS_KEY.auth_token)?.value;
  // If token exists
  if (token) {
    if (request.nextUrl.pathname !== "/admin/dashboard") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  } else {
    // If no token
    if (request.nextUrl.pathname !== "/auth") {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
