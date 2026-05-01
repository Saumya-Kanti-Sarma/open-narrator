/**
 * UI element — voice dropdown selector.
 * Props: value, onChange, voices
 */

import { Voice, getVoiceDisplayName, ACCENT_LABEL } from "../../utils/voices";
import styles from "./VoiceSelect.module.css";

interface Props {
  value: string;
  onChange: (voice: string) => void;
  voices: Voice[];
}

export default function VoiceSelect({ value, onChange, voices }: Props) {
  return (
    <div className={styles.wrap}>
      <span className={styles.label}>Voice</span>
      <select
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {voices.map((v) => (
          <option key={v.name} value={v.name}>
            {getVoiceDisplayName(v.name)} — {ACCENT_LABEL[v.accent]}
          </option>
        ))}
      </select>
    </div>
  );
}
