/**
 * Purpose: Validates admin credentials and sets a session cookie
 * Used in: Admin login page
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const validEmail = process.env.ADMIN_EMAIL;
  const validPassword = process.env.ADMIN_PASSWORD;

  if (!validEmail || !validPassword) {
    return NextResponse.json({ error: "Server misconfiguration." }, { status: 500 });
  }

  if (email !== validEmail || password !== validPassword) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  // Set a simple httpOnly session cookie valid for 8 hours
  const cookieStore = await cookies();
  cookieStore.set("admin_session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8,
    path: "/",
  });

  return NextResponse.json({ ok: true });
}
