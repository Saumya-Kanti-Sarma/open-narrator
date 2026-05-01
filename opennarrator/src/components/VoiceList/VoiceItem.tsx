/**
 * Component — voice card in the sidebar.
 * Shows emoji avatar, display name, accent tag, progress bar, and play/pause.
 */

import { useRef, useState, useEffect } from "react";
import { Voice, getSampleAudioUrl, getVoiceDisplayName, ACCENT_LABEL } from "../../utils/voices";
import styles from "./VoiceItem.module.css";

interface Props {
  voice: Voice;
  isPlaying: boolean;
  onPlay: (name: string) => void;
  onStop: () => void;
}

export default function VoiceItem({ voice, isPlaying, onPlay, onStop }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);

  /* Sync play/pause driven by parent */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.src = getSampleAudioUrl(voice.name);
      audio.play().catch(() => { });
    } else {
      audio.pause();
      audio.currentTime = 0;
      setProgress(0);
    }
  }, [isPlaying, voice.name]);

  function handleTimeUpdate() {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    setProgress((audio.currentTime / audio.duration) * 100);
  }

  function handleEnded() {
    setProgress(0);
    onStop();
  }

  function handleToggle() {
    if (isPlaying) {
      onStop();
    } else {
      onPlay(voice.name);
    }
  }

  return (
    <div className={`${styles.card} ${isPlaying ? styles.playing : ""}`}>

      {/* Top: avatar + name + accent tag */}
      <div className={styles.top}>
        <div className={styles.avatar} aria-hidden="true">
          {voice.emoji}
        </div>
        <div className={styles.meta}>
          <div className={styles.name}>{getVoiceDisplayName(voice.name)}</div>
          <span className={styles.accentTag}>{ACCENT_LABEL[voice.accent]}</span>
        </div>
      </div>

      {/* Bottom: progress bar + play button */}
      <div className={styles.bottom}>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
        <button
          className={`${styles.playBtn} ${isPlaying ? styles.playing : ""}`}
          onClick={handleToggle}
          aria-label={isPlaying ? `Pause ${voice.name}` : `Play ${voice.name}`}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        preload="none"
      />
    </div>
  );
}
