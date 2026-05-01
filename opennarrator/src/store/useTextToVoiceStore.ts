/**
 * Local state for the TextToVoice page.
 * generatedList is persisted to localStorage so it survives refreshes.
 * On mount, stale entries whose files no longer exist are pruned via loadFromDisk.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { invoke } from "@tauri-apps/api/tauri";

export type SpeakerMode = "single" | "multi" | "batch";

export interface GeneratedAudio {
  id: string;
  voice: string;
  text: string;
  filePath: string;
  selected: boolean;
}

interface TextToVoiceStore {
  mode: SpeakerMode;
  text: string;
  selectedVoice: string;
  speed: number;
  isGenerating: boolean;
  generatedList: GeneratedAudio[];

  setMode: (mode: SpeakerMode) => void;
  setText: (text: string) => void;
  setVoice: (voice: string) => void;
  setSpeed: (speed: number) => void;
  setGenerating: (val: boolean) => void;
  addGenerated: (audio: GeneratedAudio) => void;
  toggleSelect: (id: string) => void;
  deleteSelected: () => void;

  /**
   * Scans the outputs folder via Rust and syncs the list:
   * - Adds any WAV files on disk that aren't in the list yet
   * - Removes list entries whose files no longer exist on disk
   */
  loadFromDisk: () => Promise<void>;
}

export const useTextToVoiceStore = create<TextToVoiceStore>()(
  persist(
    (set, get) => ({
      mode: "single",
      text: "",
      selectedVoice: "af_heart",
      speed: 1.0,
      isGenerating: false,
      generatedList: [],

      setMode: (mode) => set({ mode }),
      setText: (text) => set({ text }),
      setVoice: (voice) => set({ selectedVoice: voice }),
      setSpeed: (speed) => set({ speed }),
      setGenerating: (val) => set({ isGenerating: val }),

      addGenerated: (audio) =>
        set((state) => ({ generatedList: [audio, ...state.generatedList] })),

      toggleSelect: (id) =>
        set((state) => ({
          generatedList: state.generatedList.map((a) =>
            a.id === id ? { ...a, selected: !a.selected } : a
          ),
        })),

      deleteSelected: () =>
        set((state) => ({
          generatedList: state.generatedList.filter((a) => !a.selected),
        })),

      loadFromDisk: async () => {
        try {
          /* Get all WAV paths currently on disk */
          const diskPaths = await invoke<string[]>("scan_outputs");
          const diskSet = new Set(diskPaths);

          const existing = get().generatedList;
          const existingPaths = new Set(existing.map((a) => a.filePath));

          /* Keep entries whose files still exist */
          const kept = existing.filter((a) => diskSet.has(a.filePath));

          /* Add disk files that aren't tracked yet */
          const newEntries: GeneratedAudio[] = diskPaths
            .filter((p) => !existingPaths.has(p))
            .map((p) => {
              /* Extract voice name from filename: output_af_heart_123.wav or output_123.wav */
              const filename = p.replace(/\\/g, "/").split("/").pop() ?? p;
              const voice = filename.replace(/^output_/, "").replace(/_\d+\.wav$/, "") || "unknown";
              return {
                id: crypto.randomUUID(),
                voice,
                text: "",
                filePath: p,
                selected: false,
              };
            });

          /* Merge: new entries first (newest on disk), then kept existing */
          set({ generatedList: [...newEntries, ...kept] });
        } catch (err) {
          console.error("loadFromDisk failed:", err);
        }
      },
    }),
    {
      name: "open-narrator-generated",
      /* Only persist the generated list — not transient state */
      partialize: (state) => ({ generatedList: state.generatedList }),
    }
  )
);
