/**
 * Component — thin vertical status bar on the extreme left.
 * Contains menu toggle (top) and settings button (bottom).
 */

import styles from "./StatusBar.module.css";

interface Props {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function StatusBar({ sidebarOpen, onToggleSidebar }: Props) {
  return (
    <div className={styles.bar}>
      <div className={styles.top}>
        {/* Menu — toggles sidebar */}
        <button
          className={`${styles.iconBtn} ${sidebarOpen ? styles.active : ""}`}
          onClick={onToggleSidebar}
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <img src="/icons/menu.svg" alt="" />
        </button>
      </div>

      <div className={styles.bottom}>
        {/* Settings — placeholder, no action yet */}
        <button
          className={styles.iconBtn}
          aria-label="Settings"
          title="Settings"
        >
          <img src="/icons/settings.svg" alt="" />
        </button>
      </div>
    </div>
  );
}
