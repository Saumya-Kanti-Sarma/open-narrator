/**
 * Purpose: Returns the list of available sample voice names
 * Used in: VoiceDemo modal (client fetch)
 * Dependencies: fs, path, Next.js Route Handler
 */

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const dir = path.join(process.cwd(), "Sample_Voices");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".wav"));
  const voices = files.map((f) => ({
    id: f.replace(".wav", ""),
    filename: f,
  }));
  return NextResponse.json(voices);
}
