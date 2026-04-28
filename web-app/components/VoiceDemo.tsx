/**
 * Purpose: Modal popup showing all sample voices with play controls
 * Used in: HeroSection (triggered by "Get A Demo" button)
 * Dependencies: VoiceCard element, react-icons
 */

"use client";

import { useEffect, useState, useCallback } from "react";
import { MdClose } from "react-icons/md";
import VoiceCard from "./elements/VoiceCard";

/**
 * Component: VoiceDemo
 * Description: Full-screen modal that fetches voice list from API and renders playable VoiceCards
 * Props:
 * - isOpen: boolean → controls visibility
 * - onClose: () => void → close handler
 */

interface Voice {
  id: string;
  filename: string;
}

interface VoiceDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Converts snake_case id like "af_bella" → "Bella (Female)" */
function formatLabel(id: string): string {
  const prefixMap: Record<string, string> = {
    af: "Female",
    am: "Male",
    bm: "Male (British)",
    hf: "Female (Hindi)",
  };
  const parts = id.split("_");
  const prefix = parts[0];
  const name = parts.slice(1).join(" ");
  const tag = prefixMap[prefix] ?? "";
  return `${name.charAt(0).toUpperCase() + name.slice(1)}${tag ? ` · ${tag}` : ""}`;
}

export default function VoiceDemo({ isOpen, onClose }: VoiceDemoProps) {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch voice list once when modal opens
  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    fetch("/api/voices")
      .then((r) => r.json())
      .then((data: Voice[]) => setVoices(data))
      .finally(() => setLoading(false));
  }, [isOpen]);

  // Stop audio and reset when modal closes
  useEffect(() => {
    if (!isOpen) setPlayingId(null);
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handlePlay = useCallback((id: string) => setPlayingId(id), []);
  const handleStop = useCallback(() => setPlayingId(null), []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="voice-demo-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-[#1f1f1e] border border-white/10 shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/5 shrink-0">
          <div>
            <h2
              id="voice-demo-title"
              className="text-xl sm:text-2xl font-normal text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Sample Voices
            </h2>
            <p
              className="text-xs text-[#71717a] mt-0.5"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Press play to preview any voice
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close voice demo"
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-[#a1a1aa] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            <MdClose size={20} />
          </button>
        </div>

        {/* Voice grid — scrollable */}
        <div className="overflow-y-auto p-4 sm:p-6">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div
                className="w-8 h-8 rounded-full border-2 border-[var(--warning)] border-t-transparent animate-spin"
                aria-label="Loading voices"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {voices.map((v) => (
                <VoiceCard
                  key={v.id}
                  id={v.id}
                  label={formatLabel(v.id)}
                  isPlaying={playingId === v.id}
                  onPlay={handlePlay}
                  onStop={handleStop}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
