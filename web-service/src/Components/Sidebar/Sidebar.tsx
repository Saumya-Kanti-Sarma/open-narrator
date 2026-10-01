import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { toggleTheme } from "../../store/themeSlice";
import "./Sidebar.css";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <aside className={`side-bar ${sidebarOpen ? "open" : ""}`}>
      <nav>
        <div className="logo-area">
          <img src="/favicon.svg" alt="open narrator logo" />
          <h1>Open Narrator</h1>
        </div>
        <button
          className="nav-btn"
          type="button"
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <img
            className="nav-images"
            src="/logos/sidebar.svg"
            alt=""
          />
          {sidebarOpen && <span>Close Sidebar</span>}
        </button>

        <button className="nav-btn" type="button">
          <img
            className="nav-images"
            src="/logos/new-note.svg"
            alt=""
          />
          {sidebarOpen && <span>New Note</span>}
        </button>

        {sidebarOpen && (
          <section className="all-chats">
            <h3>All Chats</h3>
            <button className="chat-item" type="button">
              <span>Introduction to React</span>
            </button>
            <button className="chat-item" type="button">
              <span>DBMS Notes</span>
            </button>
            <button className="chat-item" type="button">
              <span>Technical Writing</span>
            </button>
          </section>
        )}
      </nav>

      <div className="theme-and-login-area">
        <button
          className="profile-btn"
          type="button"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          aria-pressed={theme === "dark"}
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          onClick={() => dispatch(toggleTheme())}
        >
          <span className="theme-icon" aria-hidden="true">
            {theme === "light" ? "☾" : "☀"}
          </span>
          {sidebarOpen && (
            <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
          )}
        </button>

        <button className="profile-btn" type="button">
          <img className="nav-images" src="/logos/profile.svg" alt="" />
          {sidebarOpen && <span>Sign In</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;