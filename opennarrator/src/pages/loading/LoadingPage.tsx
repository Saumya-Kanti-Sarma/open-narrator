/**
 * Route: /
 * Splash screen shown while the TTS engine loads.
 * Navigates to /home automatically once the engine is ready.
 */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useEngineStore } from "../../store/useEngineStore";
import styles from "./LoadingPage.module.css";

export default function LoadingPage() {
  const status = useEngineStore((s) => s.status);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "ready") {
      navigate("/home", { replace: true });
    }
  }, [status, navigate]);

  const isError = status === "exited";

  return (
    <div className={styles.page}>

      {/* Logo + wordmark */}
      <div className={styles.logoWrap}>
        <img
          src="/logo.svg"
          alt="Open Narrator icon"
          className={styles.logoIcon}
        />
        <img
          src="/open-narrator-text.svg"
          alt="Open Narrator"
          className={styles.logoText}
        />
      </div>

      {/* Progress bar or error */}
      {isError ? (
        <p className={styles.errorText}>Engine failed — please restart.</p>
      ) : (
        <div className={styles.barTrack}>
          <div className={styles.barFill} />
        </div>
      )}

    </div>
  );
}
