/**
 * Purpose: Zustand store for TTS engine state
 * Listens to Tauri events from the Rust backend and exposes
 * helpers to send commands and read responses.
 */

import { create } from "zustand";
import { listen, emit } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api/tauri";

export type EngineStatus = "idle" | "loading" | "ready" | "exited" | "error";

interface EngineStore {
  status: EngineStatus;
  lastResponse: Record<string, unknown> | null;
  lastError: string | null;

  // Called once on app mount — sets up all Tauri event listeners
  init: () => Promise<void>;

  // Send a raw command string to the engine stdin
  send: (command: string) => Promise<void>;

  // Convenience: list voices
  listVoices: () => Promise<void>;

  // Convenience: generate a WAV file
  generate: (opts: {
    text: string;
    voice: string;
    out: string;
    speed?: number;
    captions?: boolean;
  }) => Promise<void>;
}

export const useEngineStore = create<EngineStore>((set) => ({
  status: "idle",
  lastResponse: null,
  lastError: null,

  init: async () => {
    // Engine status events (loading → ready → exited)
    await listen<{ status: string }>("engine-status", (event) => {
      const s = event.payload.status;
      if (s === "loading") set({ status: "loading" });
      else if (s === "ready") set({ status: "ready" });
      else if (s === "exited") set({ status: "exited" });
    });

    // All stdout responses from the engine
    await listen<Record<string, unknown>>("engine-response", (event) => {
      const payload = event.payload;
      if (payload.status === "error") {
        set({ lastError: String(payload.error ?? "Unknown error") });
      } else {
        set({ lastResponse: payload, lastError: null });
      }
    });

    // stderr events (progress, loading signal)
    await listen<Record<string, unknown>>("engine-stderr", (event) => {
      // You can extend this to track progress if needed
      console.debug("[engine stderr]", event.payload);
    });
  },

  send: async (command: string) => {
    await invoke("engine_send", { command });
  },

  listVoices: async () => {
    await invoke("engine_send", { command: "--voices" });
  },

  generate: async ({ text, voice, out, speed = 1.0, captions = false }) => {
    const cmd = [
      `--text "${text.replace(/"/g, '\\"')}"`,
      `--voice ${voice}`,
      `--out ${out}`,
      `--speed ${speed}`,
      captions ? "--captions true" : "",
    ]
      .filter(Boolean)
      .join(" ");

    await invoke("engine_send", { command: cmd });
  },
}));
