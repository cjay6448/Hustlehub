"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { C, FD, FB } from "../styles/tokens";

function Maple({ size = 20, color = C.amberL }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill={color} style={{ flexShrink: 0 }}>
      <path d="M50 5L57 30L75 20L65 40L90 38L72 55L80 80L60 68L50 90L40 68L20 80L28 55L10 38L35 40L25 20L43 30Z" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { href: "/",        label: "Home"    },
    { href: "/blog",    label: "Blog"    },
    { href: "/about",   label: "About"   },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <style>{`
        .nav-desktop { display: flex; align-items: center; gap: 4px; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
        }
      `}</style>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
        background: scrolled ? "rgba(253,248,240,0.97)" : "rgba(253,248,240,0.85)",
        backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
        borderBottom: `1px solid ${scrolled ? C.creamDD : "transparent"}`,
        boxShadow: scrolled ? "0 2px 22px rgba(26,58,42,0.08)" : "none",
        transition: "all 0.3s", height: 64,
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%" }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flexShrink: 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: C.forest, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Maple size={18} color={C.amberL} />
            </div>
            <div>
              <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 17, color: C.forest, lineHeight: 1.1, whiteSpace: "nowrap" }}>HustleHub</div>
              <div style={{ fontFamily: FB, fontSize: 9, color: C.muted, letterSpacing: "0.1em", whiteSpace: "nowrap" }}>.ca — Canadian Finance</div>
            </div>
          </Link>

          {/* Desktop nav only */}
          <nav className="nav-desktop">
            {links.map(({ href, label }) => (
              <Link key={href} href={href} style={{
                fontFamily: FB, fontSize: 14,
                fontWeight: pathname === href ? 700 : 500,
                color: pathname === href ? C.forest : C.muted,
                background: pathname === href ? C.creamD : "none",
                padding: "8px 14px", borderRadius: 9, textDecoration: "none",
                transition: "all 0.2s", whiteSpace: "nowrap",
              }}>{label}</Link>
            ))}
            <Link href="/contact" style={{
              fontFamily: FB, fontSize: 13, fontWeight: 700, color: C.white,
              background: C.forest, padding: "9px 18px", borderRadius: 10,
              textDecoration: "none", marginLeft: 8, whiteSpace: "nowrap",
              boxShadow: "0 2px 12px rgba(26,58,42,0.28)",
            }}>Get Free Updates</Link>
          </nav>
        </div>
      </header>
    </>
  );
}
