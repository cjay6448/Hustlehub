import { C, FD, FB } from "../../styles/tokens";

export const metadata = {
  title: "Expert Contributors | HustleHub.ca",
  description: "Real Canadian CPAs, insurance advisors, and mortgage brokers contributing to HustleHub.ca.",
};

export default function ContributorsPage() {
  const contributors = [
    { initials: "CPA", name: "John Smith, CPA", role: "Tax Professional", specialty: "Small business taxes, self-employment, CRA audits", location: "Vancouver, BC", color: C.forest },
    { initials: "INS", name: "Sarah Lee", role: "Insurance Advisor", specialty: "Life insurance, critical illness, disability coverage", location: "Surrey, BC", color: C.amber },
    { initials: "MTG", name: "Raj Patel", role: "Mortgage Broker", specialty: "First-time buyers, refinancing, BC programs", location: "Abbotsford, BC", color: "#2a5a6a" },
  ];

  return (
    <main style={{ background: C.cream, paddingTop: 64, minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(160deg,#1a3a2a,#2d5a42)", padding: "clamp(48px,6vw,68px) 24px clamp(36px,5vw,52px)", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <h1 style={{ fontFamily: FD, fontSize: "clamp(28px,4.5vw,46px)", fontWeight: 800, color: "#ffffff", lineHeight: 1.15, marginBottom: 14 }}>Expert Contributors</h1>
          <p style={{ fontFamily: FB, fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.72, maxWidth: 500 }}>
            Real Canadian professionals who contribute guides, answer questions, and bring their expertise to HustleHub readers.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1020, margin: "0 auto", padding: "clamp(44px,6vw,64px) 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 24 }}>
          {contributors.map(({ initials, name, role, specialty, location, color }) => (
            <a key={name} href={"/contributors/" + name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
              style={{ background: C.white, borderRadius: 18, overflow: "hidden", textDecoration: "none", border: "1.5px solid #e8dcc8", boxShadow: "0 2px 14px rgba(26,58,42,0.06)", display: "flex", flexDirection: "column" }}>
              <div style={{ height: 4, background: color }} />
              <div style={{ padding: "24px 24px 26px", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: color + "18", border: "1.5px solid " + color + "30", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: FD, fontSize: 13, fontWeight: 700, color: color }}>{initials}</span>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: FD, fontSize: 16, fontWeight: 700, color: C.charcoal, margin: 0, marginBottom: 3 }}>{name}</h3>
                    <span style={{ fontFamily: FB, fontSize: 11, fontWeight: 700, color: color, letterSpacing: "0.1em", textTransform: "uppercase" }}>{role}</span>
                  </div>
                </div>
                <p style={{ fontFamily: FB, fontSize: 13, color: C.muted, lineHeight: 1.65, margin: 0 }}>{specialty}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: "auto", paddingTop: 12, borderTop: "1px solid #f2e8d8" }}>
                  <span style={{ fontSize: 13 }}>📍</span>
                  <span style={{ fontFamily: FB, fontSize: 12, color: C.mutedL }}>{location}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div style={{ marginTop: 60, background: "linear-gradient(135deg,#1a3a2a,#2d5a42)", borderRadius: 20, padding: "clamp(32px,5vw,48px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <h2 style={{ fontFamily: FD, fontSize: "clamp(20px,3vw,28px)", fontWeight: 700, color: "#ffffff", marginBottom: 12 }}>Are You a Canadian Finance Professional?</h2>
          <p style={{ fontFamily: FB, fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.72, marginBottom: 24, maxWidth: 480, margin: "0 auto 24px" }}>
            CPAs, insurance advisors, and mortgage brokers — contribute articles and get your own profile page with lead capture.
          </p>
          <a href="/contact" style={{ display: "inline-block", fontFamily: FB, fontSize: 14, fontWeight: 700, color: "#1a3a2a", background: "#e8960e", padding: "13px 28px", borderRadius: 12, textDecoration: "none" }}>Get in Touch</a>
        </div>
      </div>
      <div className="bottom-nav-spacer" />
    </main>
  );
}
