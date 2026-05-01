/**
 * Purpose: Clears the admin session cookie
 * Used in: Admin dashboard logout button
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return NextResponse.json({ ok: true });
}
