"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check saved preference or OS preference
    const saved = localStorage.getItem("hh-theme");
    if (saved === "dark") {
      setDark(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else if (saved === "light") {
      setDark(false);
      document.documentElement.removeAttribute("data-theme");
    } else {
      // Use OS preference as default
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDark(prefersDark);
    }
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

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        width: 38,
        height: 22,
        borderRadius: 11,
        border: "none",
        background: dark ? "#2d5a42" : "#e8dcc8",
        cursor: "pointer",
        position: "relative",
        transition: "background 0.25s",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        padding: "0 3px",
      }}>
      {/* Track icons */}
      <span style={{
        position: "absolute", left: 5, fontSize: 9,
        opacity: dark ? 0 : 1, transition: "opacity 0.2s"
      }}>☀️</span>
      <span style={{
        position: "absolute", right: 5, fontSize: 9,
        opacity: dark ? 1 : 0, transition: "opacity 0.2s"
      }}>🌙</span>
      {/* Thumb */}
      <span style={{
        width: 16, height: 16, borderRadius: "50%",
        background: dark ? "#e8960e" : "#1a3a2a",
        transform: dark ? "translateX(16px)" : "translateX(0)",
        transition: "transform 0.25s, background 0.25s",
        display: "block",
        boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
        flexShrink: 0,
      }} />
    </button>
  );
}
