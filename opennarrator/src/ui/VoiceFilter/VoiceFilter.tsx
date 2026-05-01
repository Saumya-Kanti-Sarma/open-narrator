/**
 * UI element — filter chips for accent and gender.
 * "All" chip clears the filter for that group.
 */

import { Accent, Gender } from "../../utils/voices";
import styles from "./VoiceFilter.module.css";

export interface FilterState {
  accent: Accent | "all";
  gender: Gender | "all";
}

interface Props {
  filter: FilterState;
  onChange: (filter: FilterState) => void;
}

const ACCENT_CHIPS: { label: string; value: Accent | "all" }[] = [
  { label: "All", value: "all" },
  { label: "🇺🇸 American", value: "american" },
  { label: "🇬🇧 British", value: "british" },
  { label: "🇮🇳 Hindi", value: "hindi" },
];

const GENDER_CHIPS: { label: string; value: Gender | "all" }[] = [
  { label: "All", value: "all" },
  { label: "♀ Female", value: "female" },
  { label: "♂ Male", value: "male" },
];

export default function VoiceFilter({ filter, onChange }: Props) {
  return (
    <div className={styles.wrap}>
      <span className={styles.groupLabel}>Accent</span>
      <div className={styles.row}>
        {ACCENT_CHIPS.map((chip) => (
          <button
            key={chip.value}
            className={`${styles.chip} ${filter.accent === chip.value ? styles.active : ""}`}
            onClick={() => onChange({ ...filter, accent: chip.value })}
          >
            {chip.label}
          </button>
        ))}
      </div>

      <span className={styles.groupLabel}>Gender</span>
      <div className={styles.row}>
        {GENDER_CHIPS.map((chip) => (
          <button
            key={chip.value}
            className={`${styles.chip} ${filter.gender === chip.value ? styles.active : ""}`}
            onClick={() => onChange({ ...filter, gender: chip.value })}
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}
