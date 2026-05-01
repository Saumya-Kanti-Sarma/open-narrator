/**
 * Purpose: Full-screen loading overlay shown while the TTS engine initialises
 * Shown when engine status is "idle" or "loading"
 * Disappears once status becomes "ready"
 */

import { useEngineStore } from "../store/useEngineStore";

export default function EngineLoader() {
  const status = useEngineStore((s) => s.status);

  if (status === "ready") return null;

  const isError = status === "exited";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        background: "var(--bg)",
        color: "var(--text)",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* Logo / app name */}
      <h1
        style={{
          fontFamily: "var(--font-rajdhani)",
          fontSize: 36,
          fontWeight: 700,
          margin: 0,
          letterSpacing: 1,
        }}
      >
        Open Narrator
      </h1>

      {isError ? (
        <>
          <p style={{ color: "#ef4444", fontSize: 14, margin: 0 }}>
            Engine failed to start. Please restart the app.
          </p>
        </>
      ) : (
        <>
          {/* Spinner */}
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "3px solid var(--bg-border)",
              borderTopColor: "var(--warning)",
              animation: "spin 0.9s linear infinite",
            }}
          />

          <p
            style={{
              fontSize: 13,
              color: "var(--text-muted)",
              margin: 0,
            }}
          >
            {status === "idle" ? "Starting engine…" : "Loading voice model…"}
          </p>

          <p
            style={{
              fontSize: 11,
              color: "var(--text-subtle)",
              margin: 0,
            }}
          >
            This may take a few seconds on first launch
          </p>
        </>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
