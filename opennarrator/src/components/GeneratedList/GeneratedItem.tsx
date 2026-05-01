/**
 * Component — a single generated audio card.
 * Plays via Tauri asset protocol, supports save-to-disk and select/delete.
 */

import { useRef, useState, useEffect } from "react";
import { GeneratedAudio } from "../../store/useTextToVoiceStore";
import { toPlayableUrl, saveAudioFile } from "../../services/audioService";
import styles from "./GeneratedItem.module.css";

interface Props {
  audio: GeneratedAudio;
  isPlaying: boolean;
  onPlay: (id: string) => void;
  onStop: () => void;
  onToggleSelect: (id: string) => void;
}

export default function GeneratedItem({
  audio,
  isPlaying,
  onPlay,
  onStop,
  onToggleSelect,
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [saving, setSaving] = useState(false);

  /* Convert the engine's file path to a tauri:// URL the webview can load */
  const playableUrl = toPlayableUrl(audio.filePath);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    if (isPlaying) {
      el.src = playableUrl;
      el.play().catch(() => { });
    } else {
      el.pause();
      el.currentTime = 0;
      setProgress(0);
    }
  }, [isPlaying, playableUrl]);

  function handleTimeUpdate() {
    const el = audioRef.current;
    if (!el || !el.duration) return;
    setProgress((el.currentTime / el.duration) * 100);
  }

  function handleEnded() {
    setProgress(0);
    onStop();
  }

  async function handleSave() {
    setSaving(true);
    try {
      const suggestedName = `${audio.voice}_${Date.now()}.wav`;
      await saveAudioFile(audio.filePath, suggestedName);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={`${styles.card} ${audio.selected ? styles.selected : ""} ${isPlaying ? styles.playing : ""}`}>

      {/* Top row: checkbox + voice name + text preview */}
      <div className={styles.top}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={audio.selected}
          onChange={() => onToggleSelect(audio.id)}
          aria-label={`Select ${audio.voice}`}
        />
        <div className={styles.info}>
          <div className={styles.voiceName}>{audio.voice}</div>
          <div className={styles.textPreview}>{audio.text}</div>
        </div>
      </div>

      {/* Bottom row: progress bar + play + save */}
      <div className={styles.bottom}>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>

        <button
          className={`${styles.actionBtn} ${isPlaying ? styles.activeBtn : ""}`}
          onClick={() => (isPlaying ? onStop() : onPlay(audio.id))}
          aria-label={isPlaying ? "Pause" : "Play"}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        <button
          className={styles.actionBtn}
          onClick={handleSave}
          disabled={saving}
          aria-label="Save audio file"
          title="Save to disk"
        >
          {saving ? "…" : "💾"}
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
