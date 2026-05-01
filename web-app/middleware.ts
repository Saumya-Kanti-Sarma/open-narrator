/**
 * Purpose: Protects /admin/dashboard — redirects to /admin if not authenticated
 */

import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("admin_session");
  const { pathname } = req.nextUrl;

  // Protect everything under /admin/dashboard
  if (pathname.startsWith("/admin/dashboard")) {
    if (session?.value !== "authenticated") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  // If already logged in and hitting /admin login page, redirect to dashboard
  if (pathname === "/admin" && session?.value === "authenticated") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/dashboard/:path*"],
};
