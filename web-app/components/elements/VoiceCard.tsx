/**
 * Purpose: Card displaying a single voice with play/pause control and progress bar
 * Used in: VoiceDemo modal
 * Dependencies: react-icons
 */

"use client";

import { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

/**
 * Component: VoiceCard
 * Description: Renders a voice sample card with play/pause, waveform progress, and label
 * Props:
 * - id: string → voice identifier (used to build API URL)
 * - label: string → display name
 * - isPlaying: boolean → whether this card is currently playing
 * - onPlay: (id: string) → callback to notify parent to stop others
 * - onStop: () => void → callback when audio ends naturally
 */

interface VoiceCardProps {
  id: string;
  label: string;
  isPlaying: boolean;
  onPlay: (id: string) => void;
  onStop: () => void;
}

export default function VoiceCard({ id, label, isPlaying, onPlay, onStop }: VoiceCardProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // Sync play/pause state driven by parent
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.src = `/api/voices/${id}`;
      audio.play().catch(() => { });
    } else {
      audio.pause();
      audio.currentTime = 0;
      setProgress(0);
    }
  }, [isPlaying, id]);

  function handleTimeUpdate() {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    setProgress((audio.currentTime / audio.duration) * 100);
  }

  function handleLoadedMetadata() {
    if (audioRef.current) setDuration(audioRef.current.duration);
  }

  function handleEnded() {
    setProgress(0);
    onStop();
  }

  function handleToggle() {
    if (isPlaying) {
      onStop();
    } else {
      onPlay(id);
    }
  }

  function formatTime(s: number) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }

  const elapsed = audioRef.current
    ? (progress / 100) * (audioRef.current.duration || 0)
    : 0;

  return (
    <article
      className={`flex flex-col gap-3 p-4 rounded-2xl border transition-all duration-200 ${isPlaying
          ? "bg-[var(--warning)]/10 border-[var(--warning)]/40 shadow-[0_0_20px_rgba(245,158,11,0.12)]"
          : "bg-[#282828] border-white/5 hover:border-white/15"
        }`}
      aria-label={`Voice sample: ${label}`}
    >
      {/* Top row: play btn + label */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggle}
          aria-label={isPlaying ? `Pause ${label}` : `Play ${label}`}
          className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1f1f1e] ${isPlaying
              ? "bg-[var(--warning)] text-[#1f1f1e] focus:ring-[var(--warning)]"
              : "bg-white/10 text-white hover:bg-white/20 focus:ring-white/40"
            }`}
        >
          {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} className="ml-0.5" />}
        </button>

        <div className="flex flex-col min-w-0">
          <span
            className="text-sm font-semibold text-white truncate"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {label}
          </span>
          {duration > 0 && (
            <span
              className="text-xs text-[#71717a]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {formatTime(elapsed)} / {formatTime(duration)}
            </span>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-[var(--warning)] transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="none"
      />
    </article>
  );
}
