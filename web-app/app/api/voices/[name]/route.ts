/**
 * Purpose: Streams a single sample voice WAV file by name
 * Used in: VoiceDemo modal — triggered when user clicks play
 * Dependencies: fs, path, Next.js Route Handler
 */

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const safeName = path.basename(name);
  const filePath = path.join(process.cwd(), "Sample_Voices", `${safeName}.wav`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const buffer = fs.readFileSync(filePath);
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "audio/wav",
      "Content-Length": buffer.byteLength.toString(),
      "Cache-Control": "public, max-age=3600",
    },
  });
}
