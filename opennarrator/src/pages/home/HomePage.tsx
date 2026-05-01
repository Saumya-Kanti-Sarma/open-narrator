/**
 * Route: /home
 * Main app — three feature cards that navigate to their respective routes.
 */

import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

/* Card data — add more entries here to extend the grid */
const CARDS = [
  {
    label: "Text to Voice",
    icon: "/icons/voice.svg",
    route: "/TextToVoice",
  },
  {
    label: "Narrate from File",
    icon: "/icons/files.svg",
    route: "/NarrateDocument",
  },
  {
    label: "Edit Video",
    icon: "/icons/video-edit.svg",
    route: "/VideoEditor",
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      <h1 className={styles.heading}>What do you want to create?</h1>

      <div className={styles.grid}>
        {CARDS.map((card) => (
          <button
            key={card.route}
            className={styles.card}
            onClick={() => navigate(card.route)}
            aria-label={card.label}
          >
            <span className={styles.iconWrap} aria-hidden="true">
              <img src={card.icon} alt={card.icon} />
            </span>
            <span className={styles.label}>{card.label}</span>
          </button>
        ))}
      </div>
    </main>
  );
}
