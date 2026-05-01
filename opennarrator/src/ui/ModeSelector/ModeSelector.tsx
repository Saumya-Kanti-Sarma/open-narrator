/**
 * UI element — tab-style mode switcher.
 * Props: value, onChange
 */

import { SpeakerMode } from "../../store/useTextToVoiceStore";
import styles from "./ModeSelector.module.css";

const MODES: { label: string; value: SpeakerMode }[] = [
  { label: "Single Speaker", value: "single" },
  { label: "Multi Speaker", value: "multi" },
  { label: "Batch", value: "batch" },
];

interface Props {
  value: SpeakerMode;
  onChange: (mode: SpeakerMode) => void;
}

export default function ModeSelector({ value, onChange }: Props) {
  return (
    <div className={styles.wrap}>
      {MODES.map((m) => (
        <button
          key={m.value}
          className={`${styles.btn} ${value === m.value ? styles.active : ""}`}
          onClick={() => onChange(m.value)}
          aria-pressed={value === m.value}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
