"use client";
import Link from "next/link";
import { C, FD, FB } from "../styles/tokens";

function Maple({ size = 18, color = C.amberL }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill={color} style={{ flexShrink: 0 }}>
      <path d="M50 5L57 30L75 20L65 40L90 38L72 55L80 80L60 68L50 90L40 68L20 80L28 55L10 38L35 40L25 20L43 30Z" />
    </svg>
  );
}

export default function Footer() {
  const nav = {
    Topics: [
      { label: "Benefits",            href: "/blog" },
      { label: "Investing",           href: "/blog" },
      { label: "Housing",             href: "/blog" },
      { label: "Side Income",         href: "/blog" },
      { label: "Government Benefits", href: "/blog" },
    ],
    Site: [
      { label: "Home",         href: "/"            },
      { label: "Blog",         href: "/blog"        },
      { label: "About",        href: "/about"       },
      { label: "Contact",      href: "/contact"     },
      { label: "Contributors", href: "/contributors"},
    ],
    Legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use",   href: "/terms"   },
    ],
  };

  return (
    <footer style={{ background: C.charcoal, padding: "clamp(36px,5vw,56px) 24px 28px" }}>
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 36, marginBottom: 44 }}>

          {/* Brand + newsletter */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: C.forest,
                display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Maple size={18} color={C.amberL} />
              </div>
              <div>
                <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 17, color: C.white }}>HustleHub</div>
                <div style={{ fontFamily: FB, fontSize: 10, color: "rgba(255,255,255,0.38)", letterSpacing: "0.12em" }}>.ca</div>
              </div>
            </div>
            <p style={{ fontFamily: FB, fontSize: 13, color: "rgba(255,255,255,0.48)",
              lineHeight: 1.72, maxWidth: 260, marginBottom: 20 }}>
              Helping Canadians understand their money since 2023. Free, independent, always plain English.
            </p>
            <form onSubmit={e => e.preventDefault()}
              style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <input type="email" placeholder="your@email.ca"
                style={{ flex: "1 1 140px", fontFamily: FB, fontSize: 13,
                  padding: "10px 14px", borderRadius: 9, border: "none",
                  background: "rgba(255,255,255,0.1)", color: C.white,
                  outline: "none", minHeight: 40 }} />
              <button type="submit" style={{ fontFamily: FB, fontSize: 13, fontWeight: 700,
                color: C.white, background: C.forest, border: "none",
                padding: "10px 16px", borderRadius: 9, cursor: "pointer", minHeight: 40 }}>
                Join
              </button>
            </form>
          </div>

          {/* Link columns */}
          {Object.entries(nav).map(([title, links]) => (
            <div key={title}>
              <h4 style={{ fontFamily: FB, fontSize: 11, fontWeight: 700,
                color: "rgba(255,255,255,0.4)", letterSpacing: "0.16em",
                textTransform: "uppercase", marginBottom: 16 }}>{title}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {links.map(({ label, href }) => (
                  <Link key={label} href={href} style={{ fontFamily: FB, fontSize: 13,
                    color: "rgba(255,255,255,0.52)", textDecoration: "none",
                    transition: "color 0.18s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = C.amberL)}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.52)")}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 22,
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: FB, fontSize: 12, color: "rgba(255,255,255,0.28)", margin: 0 }}>
            2026 HustleHub.ca — For educational purposes only. Not affiliated with CRA or the Government of Canada.
          </p>
          <p style={{ fontFamily: FB, fontSize: 12, color: "rgba(255,255,255,0.28)", margin: 0 }}>
            Abbotsford, BC 🇨🇦
          </p>
        </div>
      </div>
    </footer>
  );
}