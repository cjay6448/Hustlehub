"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { C, FD, FB, FM } from "../styles/tokens";

function Maple({ size = 20, color = C.amberL }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill={color} style={{ flexShrink: 0 }}>
      <path d="M50 5L57 30L75 20L65 40L90 38L72 55L80 80L60 68L50 90L40 68L20 80L28 55L10 38L35 40L25 20L43 30Z" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mOpen, setMOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { href: "/",          label: "Home"    },
    { href: "/blog",      label: "Blog"    },
    { href: "/about",     label: "About"   },
    { href: "/contact",   label: "Contact" },
  ];

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(253,248,240,0.97)" : "rgba(253,248,240,0.65)",
      backdropFilter: "blur(14px)",
      borderBottom: `1px solid ${scrolled ? C.creamDD : "transparent"}`,
      boxShadow: scrolled ? "0 2px 22px rgba(26,58,42,0.08)" : "none",
      transition: "all 0.3s",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>

        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: C.forest,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 10px rgba(26,58,42,0.3)" }}>
            <Maple size={20} color={C.amberL} />
          </div>
          <div>
            <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 19, color: C.forest, lineHeight: 1.1 }}>HustleHub</div>
            <div style={{ fontFamily: FB, fontSize: 10, color: C.muted, letterSpacing: "0.12em" }}>.ca — Canadian Finance</div>
          </div>
        </Link>

        {/* Desktop links */}
        <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {links.map(({ href, label }) => (
            <Link key={href} href={href} style={{
              fontFamily: FB, fontSize: 14, fontWeight: pathname === href ? 700 : 500,
              color: pathname === href ? C.forest : C.muted,
              background: pathname === href ? C.creamD : "none",
              padding: "8px 14px", borderRadius: 9, textDecoration: "none",
              transition: "all 0.2s",
            }}>{label}</Link>
          ))}
          <Link href="/contact" style={{
            fontFamily: FB, fontSize: 13, fontWeight: 700, color: C.white,
            background: C.forest, padding: "9px 18px", borderRadius: 10,
            textDecoration: "none", marginLeft: 8,
            boxShadow: "0 2px 12px rgba(26,58,42,0.28)",
          }}>
            Get Free Updates
          </Link>
        </nav>
      </div>
    </header>
  );
}