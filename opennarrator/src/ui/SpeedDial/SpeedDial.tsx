/**
 * UI element — speed range slider from 0.25 to 2.00.
 * Props: value, onChange
 */

import styles from "./SpeedDial.module.css";

interface Props {
  value: number;
  onChange: (speed: number) => void;
}

export default function SpeedDial({ value, onChange }: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.label}>Speed</span>
        <span className={styles.value}>{value.toFixed(2)}×</span>
      </div>
      <input
        type="range"
        className={styles.slider}
        min={0.25}
        max={2.0}
        step={0.05}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        aria-label="Voice speed"
      />
    </div>
  );
}
