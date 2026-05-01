/**
 * Static list of bundled sample voices with metadata for filtering.
 * Each entry maps to /Sample_Voices/{name}.wav in the public folder.
 */

export type Gender = "female" | "male";
export type Accent = "american" | "british" | "hindi";

export interface Voice {
  name: string;
  lang: string;
  gender: Gender;
  accent: Accent;
  emoji: string; /* decorative avatar character */
}

export const SAMPLE_VOICES: Voice[] = [
  { name: "af_alloy", lang: "en-us", gender: "female", accent: "american", emoji: "🎙️" },
  { name: "af_aoede", lang: "en-us", gender: "female", accent: "american", emoji: "🌸" },
  { name: "af_bella", lang: "en-us", gender: "female", accent: "american", emoji: "✨" },
  { name: "af_heart", lang: "en-us", gender: "female", accent: "american", emoji: "💛" },
  { name: "af_river", lang: "en-us", gender: "female", accent: "american", emoji: "🌊" },
  { name: "af_sky", lang: "en-us", gender: "female", accent: "american", emoji: "☁️" },
  { name: "am_adam", lang: "en-us", gender: "male", accent: "american", emoji: "🎤" },
  { name: "am_echo", lang: "en-us", gender: "male", accent: "american", emoji: "🔊" },
  { name: "am_eric", lang: "en-us", gender: "male", accent: "american", emoji: "🎧" },
  { name: "am_liam", lang: "en-us", gender: "male", accent: "american", emoji: "🎵" },
  { name: "am_santa", lang: "en-us", gender: "male", accent: "american", emoji: "🎅" },
  { name: "bm_daniel", lang: "en-gb", gender: "male", accent: "british", emoji: "🎩" },
  { name: "bm_fable", lang: "en-gb", gender: "male", accent: "british", emoji: "📖" },
  { name: "hf_beta", lang: "hi", gender: "female", accent: "hindi", emoji: "🪷" },
];

/** Returns the public URL for a voice's sample WAV */
export function getSampleAudioUrl(name: string): string {
  return `/Sample_Voices/${name}.wav`;
}

/** Short display name: "af_heart" → "Heart" */
export function getVoiceDisplayName(name: string): string {
  const parts = name.split("_");
  const raw = parts.slice(1).join(" ");
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

/** Accent label for display */
export const ACCENT_LABEL: Record<Accent, string> = {
  american: "American English",
  british: "British English",
  hindi: "Hindi",
};
