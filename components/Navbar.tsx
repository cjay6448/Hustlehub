"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

function Maple({ size = 18, color = "#e8960e" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill={color}>
      <path d="M50 5L57 30L75 20L65 40L90 38L72 55L80 80L60 68L50 90L40 68L20 80L28 55L10 38L35 40L25 20L43 30Z" />
    </svg>
  );
}

export default function Navbar() {
  return (
    <nav style={{
      background: "var(--navbar-bg, rgba(253,248,240,0.97))",
      borderBottom: "1px solid var(--cream-dd, #e8dcc8)",
      padding: "0 20px",
      height: 64,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 100,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      transition: "background 0.3s",
    }}>
      {/* Logo */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
        <div style={{ width: 36, height: 36, borderRadius: 9, background: "#1a3a2a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Maple size={18} color="#e8960e" />
        </div>
        <div>
          <div style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 17, color: "var(--text, #1a3a2a)", lineHeight: 1.1 }}>HustleHub</div>
          <div style={{ fontFamily: "Courier New, monospace", fontSize: 9, color: "var(--muted, #7a7060)", letterSpacing: "0.1em" }}>.ca — Canadian Finance</div>
        </div>
      </Link>

      {/* Right side: desktop nav + toggle */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div className="desktop-nav" style={{ display: "flex", gap: 2, alignItems: "center" }}>
          {[["Home", "/"], ["Blog", "/blog"], ["About", "/about"], ["Contact", "/contact"]].map(([label, href]) => (
            <Link key={label} href={href} style={{ fontFamily: "Segoe UI, sans-serif", fontSize: 14, color: "var(--muted, #7a7060)", padding: "8px 12px", borderRadius: 8, textDecoration: "none", fontWeight: 500 }}>{label}</Link>
          ))}
          <Link href="/contact" style={{ fontFamily: "Segoe UI, sans-serif", fontSize: 13, fontWeight: 700, color: "#ffffff", background: "#1a3a2a", padding: "9px 18px", borderRadius: 10, marginLeft: 6, textDecoration: "none" }}>Get Free Updates</Link>
        </div>
        <ThemeToggle />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
