/**
 * Purpose: Returns all beta signup records from Supabase
 * Used in: Admin dashboard
 * Auth: Requires admin_session cookie
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/services/supabaseAdmin";

export async function GET(_req: NextRequest) {
  // Guard — only authenticated admins
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (session?.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("open_narrator_beta_use")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
