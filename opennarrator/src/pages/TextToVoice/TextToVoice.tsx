/**
 * Route: /TextToVoice
 * Layout: StatusBar | Sidebar (collapsible) | Editor | Generated panel
 */

import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { useTextToVoiceStore } from "../../store/useTextToVoiceStore";
import { useEngineStore } from "../../store/useEngineStore";
import { getRandomQuote } from "../../utils/quotes";
import { SAMPLE_VOICES } from "../../utils/voices";
import StatusBar from "../../components/StatusBar/StatusBar";
import VoiceList from "../../components/VoiceList/VoiceList";
import GeneratedList from "../../components/GeneratedList/GeneratedList";
import ModeSelector from "../../ui/ModeSelector/ModeSelector";
import VoiceSelect from "../../ui/VoiceSelect/VoiceSelect";
import SpeedDial from "../../ui/SpeedDial/SpeedDial";
import styles from "./TextToVoice.module.css";

export default function TextToVoice() {
  const {
    mode, text, selectedVoice, speed, isGenerating,
    setMode, setText, setVoice, setSpeed, setGenerating, addGenerated, loadFromDisk,
  } = useTextToVoiceStore();

  const { send, lastResponse } = useEngineStore();

  /* Sidebar collapse state — expanded by default */
  const [sidebarOpen, setSidebarOpen] = useState(true);

  /* Absolute path to the outputs folder — resolved from Rust on mount */
  const [outputDir, setOutputDir] = useState<string>("");

  useEffect(() => {
    invoke<string>("get_output_dir").then(setOutputDir).catch(console.error);
    /* Sync generated list with files on disk */
    loadFromDisk();
  }, []);

  /* Listen for generation completion */
  useEffect(() => {
    if (!lastResponse) return;
    if (lastResponse.status === "ok" && lastResponse.output) {
      addGenerated({
        id: crypto.randomUUID(),
        voice: String(lastResponse.voice ?? selectedVoice),
        text,
        filePath: String(lastResponse.output),
        selected: false,
      });
      setGenerating(false);
    }
    if (lastResponse.status === "error") {
      setGenerating(false);
    }
  }, [lastResponse]);

  async function handleGenerate() {
    if (!text.trim() || isGenerating || !outputDir) return;
    setGenerating(true);

    // Build an absolute output path so the engine writes to the outputs folder
    const sep = outputDir.includes("\\") ? "\\" : "/";
    const outFile = `${outputDir}${sep}output_${Date.now()}.wav`;
    const cmd = `--text "${text.replace(/"/g, '\\"')}" --voice ${selectedVoice} --speed ${speed} --out "${outFile}"`;
    await send(cmd);
  }

  function handleRandomQuote() {
    setText(getRandomQuote());
  }

  return (
    <main className={styles.page}>

      {/* Extreme left — status bar with menu + settings */}
      <StatusBar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
      />

      {/* Collapsible voice sidebar */}
      <VoiceList collapsed={!sidebarOpen} />

      {/* Centre — text editor and controls */}
      <div className={styles.editor}>
        <ModeSelector value={mode} onChange={setMode} />

        <textarea
          className={styles.textarea}
          placeholder="Type or paste your text here…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
        />

        <div className={styles.controls}>
          <div className={styles.controlsLeft}>
            <VoiceSelect
              value={selectedVoice}
              onChange={setVoice}
              voices={SAMPLE_VOICES}
            />
            <SpeedDial value={speed} onChange={setSpeed} />
          </div>

          <div className={styles.actions}>
            <button className={styles.quoteBtn} onClick={handleRandomQuote}>
              Random quote
            </button>
            <button
              className={styles.generateBtn}
              onClick={handleGenerate}
              disabled={isGenerating || !text.trim()}
            >
              {isGenerating ? "Generating…" : "Generate Voice"}
            </button>
          </div>
        </div>
      </div>

      {/* Right panel — generated audio list */}
      <GeneratedList />

    </main>
  );
}
