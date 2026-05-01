/**
 * Component — bottom panel showing all generated audio outputs.
 * Supports select, multi-select, delete, and play/pause per item.
 */

import { useState } from "react";
import { useTextToVoiceStore } from "../../store/useTextToVoiceStore";
import GeneratedItem from "./GeneratedItem";
import styles from "./GeneratedList.module.css";

export default function GeneratedList() {
  const { generatedList, toggleSelect, deleteSelected } = useTextToVoiceStore();
  const [playingId, setPlayingId] = useState<string | null>(null);

  const hasSelected = generatedList.some((a) => a.selected);

  return (
    <section className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.title}>Generated ({generatedList.length})</span>
        {hasSelected && (
          <button className={styles.deleteBtn} onClick={deleteSelected}>
            Delete selected
          </button>
        )}
      </div>

      <div className={styles.list}>
        {generatedList.length === 0 ? (
          <p className={styles.empty}>No audio generated yet.</p>
        ) : (
          generatedList.map((audio) => (
            <GeneratedItem
              key={audio.id}
              audio={audio}
              isPlaying={playingId === audio.id}
              onPlay={(id) => setPlayingId(id)}
              onStop={() => setPlayingId(null)}
              onToggleSelect={toggleSelect}
            />
          ))
        )}
      </div>
    </section>
  );
}
