/**
 * Service — Tauri-aware audio helpers.
 * Converts engine output paths to playable URLs and handles save-to-disk.
 */

import { convertFileSrc } from "@tauri-apps/api/tauri";
import { save } from "@tauri-apps/api/dialog";
import { copyFile } from "@tauri-apps/api/fs";

/**
 * Converts an absolute file path returned by the engine
 * into a tauri:// URL the webview can load as audio.
 */
export function toPlayableUrl(filePath: string): string {
  return convertFileSrc(filePath);
}

/**
 * Opens a native Save dialog and copies the generated WAV to the chosen location.
 * Returns true if saved, false if the user cancelled.
 */
export async function saveAudioFile(sourcePath: string, suggestedName: string): Promise<boolean> {
  const destination = await save({
    defaultPath: suggestedName,
    filters: [{ name: "Audio", extensions: ["wav"] }],
  });

  if (!destination) return false;

  await copyFile(sourcePath, destination);
  return true;
}
