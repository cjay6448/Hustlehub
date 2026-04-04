"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Priority: 1) saved user preference, 2) OS preference
    const saved = localStorage.getItem("hh-theme");
    let shouldBeDark = false;

    if (saved === "dark") {
      shouldBeDark = true;
    } else if (saved === "light") {
      shouldBeDark = false;
    } else {
      // No saved preference — check OS
      shouldBeDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    setDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    setMounted(true);

    // Listen for OS theme changes (only if no saved preference)
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("hh-theme")) {
        setDark(e.matches);
        if (e.matches) {
          document.documentElement.setAttribute("data-theme", "dark");
        } else {
          document.documentElement.removeAttribute("data-theme");
        }
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("hh-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("hh-theme", "light");
    }
  };

  // Render placeholder on server to avoid hydration mismatch
  if (!mounted) {
    return (
      <div style={{ width: 38, height: 22, borderRadius: 11, background: "#e8dcc8", flexShrink: 0 }} />
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        width: 42,
        height: 24,
        borderRadius: 12,
        border: "none",
        background: dark ? "#2d5a42" : "#e8dcc8",
        cursor: "pointer",
        position: "relative",
        transition: "background 0.25s",
        flexShrink: 0,
        padding: 0,
        outline: "none",
      }}>
      {/* Sun icon — visible in light mode */}
      <span style={{
        position: "absolute", left: 6, top: "50%", transform: "translateY(-50%)",
        fontSize: 10, lineHeight: 1,
        opacity: dark ? 0 : 1, transition: "opacity 0.2s",
        pointerEvents: "none",
      }}>☀️</span>
      {/* Moon icon — visible in dark mode */}
      <span style={{
        position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)",
        fontSize: 10, lineHeight: 1,
        opacity: dark ? 1 : 0, transition: "opacity 0.2s",
        pointerEvents: "none",
      }}>🌙</span>
      {/* Sliding thumb */}
      <span style={{
        position: "absolute",
        top: 4, left: 4,
        width: 16, height: 16,
        borderRadius: "50%",
        background: dark ? "#e8960e" : "#1a3a2a",
        transform: dark ? "translateX(18px)" : "translateX(0)",
        transition: "transform 0.25s, background 0.25s",
        boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
      }} />
    </button>
  );
}
