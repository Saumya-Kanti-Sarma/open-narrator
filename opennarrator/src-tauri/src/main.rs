// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{
    io::{BufRead, BufReader, Write},
    path::PathBuf,
    process::{Child, ChildStdin, Command, Stdio},
    sync::{Arc, Mutex},
    thread,
};
use tauri::{AppHandle, Manager, State};

// ── Engine state held in Tauri's managed state ────────────────────────────────

struct EngineState {
    stdin: Option<ChildStdin>,
    child: Option<Child>,
}

type SharedEngine = Arc<Mutex<EngineState>>;

// ── Resolve the path to the bundled exe and voice_model dir ──────────────────

fn resolve_engine_path(_app: &AppHandle) -> (PathBuf, PathBuf) {
    #[cfg(debug_assertions)]
    {
        // Dev mode — use the dist/ folder next to the opennarrator project
        // src-tauri is at opennarrator/src-tauri, so go up two levels to reach dist/
        let manifest_dir = PathBuf::from(env!("CARGO_MANIFEST_DIR")); // .../opennarrator/src-tauri
        let dist_dir = manifest_dir
            .parent()  // .../opennarrator
            .expect("no parent")
            .join("dist");

        let exe = dist_dir.join("open-narrator_beta_voice-model.exe");
        let model_dir = dist_dir.join("voice_model");
        (exe, model_dir)
    }

    #[cfg(not(debug_assertions))]
    {
        // Production — resources are bundled next to the exe
        let resource_dir = _app
            .path_resolver()
            .resource_dir()
            .expect("Failed to resolve resource dir");

        let exe = resource_dir.join("open-narrator_beta_voice-model.exe");
        let model_dir = resource_dir.join("voice_model");
        (exe, model_dir)
    }
}

// ── Spawn the engine process and wait for {"status":"ready"} ─────────────────

fn spawn_engine(app: AppHandle, engine: SharedEngine) {
    let (exe_path, model_dir) = resolve_engine_path(&app);

    let _ = app.emit_all("engine-status", serde_json::json!({"status": "loading"}));

    let mut child = Command::new(&exe_path)
        .current_dir(&model_dir)
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .unwrap_or_else(|e| {
            panic!(
                "Failed to spawn TTS engine\n  exe:  {}\n  cwd:  {}\n  err:  {}",
                exe_path.display(),
                model_dir.display(),
                e
            )
        });

    let stdin = child.stdin.take().expect("Failed to get stdin");
    let stdout = child.stdout.take().expect("Failed to get stdout");
    let stderr = child.stderr.take().expect("Failed to get stderr");

    // ── stderr reader ─────────────────────────────────────────────────────────
    {
        let app_clone = app.clone();
        thread::spawn(move || {
            let reader = BufReader::new(stderr);
            for line in reader.lines().flatten() {
                if let Ok(json) = serde_json::from_str::<serde_json::Value>(&line) {
                    let _ = app_clone.emit_all("engine-stderr", json);
                }
            }
        });
    }

    // ── stdout reader ─────────────────────────────────────────────────────────
    {
        let app_clone = app.clone();
        let engine_clone = engine.clone();
        thread::spawn(move || {
            let reader = BufReader::new(stdout);
            let mut ready_sent = false;

            for line in reader.lines().flatten() {
                if let Ok(json) = serde_json::from_str::<serde_json::Value>(&line) {
                    if !ready_sent {
                        if json.get("status").and_then(|s| s.as_str()) == Some("ready") {
                            ready_sent = true;
                            let _ = app_clone.emit_all(
                                "engine-status",
                                serde_json::json!({"status": "ready"}),
                            );
                        }
                    }
                    let _ = app_clone.emit_all("engine-response", json);
                }
            }

            let _ = app_clone.emit_all(
                "engine-status",
                serde_json::json!({"status": "exited"}),
            );
            if let Ok(mut state) = engine_clone.lock() {
                state.stdin = None;
                state.child = None;
            }
        });
    }

    if let Ok(mut state) = engine.lock() {
        state.stdin = Some(stdin);
        state.child = Some(child);
    }
}

// ── Tauri command: send a raw command string to the engine's stdin ────────────

#[tauri::command]
fn engine_send(command: String, engine: State<SharedEngine>) -> Result<(), String> {
    let mut state = engine
        .lock()
        .map_err(|e: std::sync::PoisonError<_>| e.to_string())?;
    let stdin = state.stdin.as_mut().ok_or("Engine not running")?;
    writeln!(stdin, "{}", command).map_err(|e: std::io::Error| e.to_string())?;
    stdin.flush().map_err(|e: std::io::Error| e.to_string())?;
    Ok(())
}

// ── Tauri command: gracefully shut down the engine ────────────────────────────

#[tauri::command]
fn engine_stop(engine: State<SharedEngine>) -> Result<(), String> {
    let mut state = engine
        .lock()
        .map_err(|e: std::sync::PoisonError<_>| e.to_string())?;
    if let Some(mut child) = state.child.take() {
        let _ = child.kill();
    }
    state.stdin = None;
    Ok(())
}

// ── Main ──────────────────────────────────────────────────────────────────────

fn main() {
    let engine: SharedEngine = Arc::new(Mutex::new(EngineState {
        stdin: None,
        child: None,
    }));

    let engine_for_setup = engine.clone();

    tauri::Builder::default()
        .manage(engine)
        .invoke_handler(tauri::generate_handler![engine_send, engine_stop])
        .setup(move |app| {
            spawn_engine(app.handle(), engine_for_setup);
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
