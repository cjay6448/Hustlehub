"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const C = {
  forest: "#1a3a2a",
  muted: "#7a7060",
  amberL: "#e8960e",
};

const FB = "'Source Sans 3', 'Segoe UI', sans-serif";

const tabs = [
  { href: "/",        icon: "🏠", label: "Home"    },
  { href: "/blog",    icon: "📰", label: "Blog"    },
  { href: "/about",   icon: "🍁", label: "About"   },
  { href: "/founder", icon: "👤", label: "Me"      },
  { href: "/contact", icon: "📬", label: "Contact" },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <>
      <div className="bottom-nav-spacer" />
      <nav className="bottom-nav-bar">
        {tabs.map(({ href, icon, label }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: 2, padding: "4px 8px", textDecoration: "none", flex: 1,
              position: "relative", minHeight: 44, justifyContent: "center",
            }}>
              {active && (
                <span style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 2, borderRadius: 2, background: C.forest }} />
              )}
              <span style={{ fontSize: 18, lineHeight: 1, opacity: active ? 1 : 0.38 }}>{icon}</span>
              <span style={{ fontFamily: FB, fontSize: 9, fontWeight: active ? 700 : 400, color: active ? C.forest : C.muted, marginTop: 2, opacity: active ? 1 : 0.55 }}>{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
