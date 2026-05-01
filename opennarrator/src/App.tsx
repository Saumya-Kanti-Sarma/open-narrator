import { useEffect } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import ThemeProvider from "./components/ThemeProvider";
import LoadingPage from "./pages/loading/LoadingPage";
import HomePage from "./pages/home/HomePage";
import { useEngineStore } from "./store/useEngineStore";

function AppRoutes() {
  const init = useEngineStore((s) => s.init);

  // Register Tauri event listeners once on mount
  useEffect(() => {
    init();
  }, [init]);

  return (
    <Routes>
      {/* Root — loading screen, auto-navigates to /home when ready */}
      <Route path="/" element={<LoadingPage />} />

      {/* Main app */}
      <Route path="/home" element={<HomePage />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      {/* HashRouter works best in Tauri (no server-side routing needed) */}
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </ThemeProvider>
  );
}
