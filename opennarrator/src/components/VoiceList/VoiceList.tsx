/**
 * Component — collapsible left sidebar with filter chips and voice cards.
 * Accepts `collapsed` prop from parent to animate open/close.
 */

import { useState } from "react";
import { SAMPLE_VOICES } from "../../utils/voices";
import VoiceItem from "./VoiceItem";
import VoiceFilter, { FilterState } from "../../ui/VoiceFilter/VoiceFilter";
import styles from "./VoiceList.module.css";

interface Props {
  collapsed: boolean;
}

export default function VoiceList({ collapsed }: Props) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterState>({ accent: "all", gender: "all" });

  const filtered = SAMPLE_VOICES.filter((v) => {
    const accentMatch = filter.accent === "all" || v.accent === filter.accent;
    const genderMatch = filter.gender === "all" || v.gender === filter.gender;
    return accentMatch && genderMatch;
  });

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
      <div className={styles.header}>Voices</div>

      <VoiceFilter filter={filter} onChange={setFilter} />

      <div className={styles.list}>
        {filtered.length === 0 ? (
          <p className={styles.empty}>No voices match the selected filters.</p>
        ) : (
          filtered.map((voice) => (
            <VoiceItem
              key={voice.name}
              voice={voice}
              isPlaying={playingId === voice.name}
              onPlay={(name) => setPlayingId(name)}
              onStop={() => setPlayingId(null)}
            />
          ))
        )}
      </div>
    </aside>
  );
}
