import { C, FD, FB, FM } from "../../styles/tokens";

export default function FounderPage() {
  const skills = [
    { icon: "🏛", label: "Canadian Benefits & CRA", years: "4 yrs" },
    { icon: "💼", label: "SaaS Sales", years: "Sage Canada, Freedom Mobile" },
    { icon: "🖥", label: "CS & Engineering", years: "B.Tech" },
    { icon: "📈", label: "Personal Finance", years: "Ongoing" },
    { icon: "🌐", label: "Content & SEO", years: "HustleHub.ca" },
    { icon: "🎬", label: "YouTube & Video Production", years: "The Discipline Experiment" },
  ];

  const projects = [
    { icon: "🍁", name: "HustleHub.ca", desc: "Canada plain-English guide to government benefits, tax credits, and personal finance. 40,000+ monthly readers.", tag: "Active", color: C.forest },
    { icon: "🎬", name: "The Discipline Experiment", desc: "A 12-episode YouTube documentary series using minimalist animation, documenting overcoming the pattern of quitting projects.", tag: "Ongoing", color: C.amber },
    { icon: "🧶", name: "Crochet Chronicles", desc: "A content site dedicated to crochet patterns, tutorials, and community.", tag: "Active", color: "#5a3e28" },
  ];

  return (
    <main style={{ background: C.cream, paddingTop: 64, minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(150deg,#1a3a2a,#2d5a42)", padding: "clamp(52px,7vw,80px) 24px clamp(44px,6vw,60px)", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24, flexWrap: "wrap" }}>
            <div style={{ width: 88, height: 88, borderRadius: "50%", background: "linear-gradient(135deg,#c97a0a,#e8960e)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 4px rgba(255,255,255,0.12), 0 8px 32px rgba(0,0,0,0.28)", flexShrink: 0 }}>
              <span style={{ fontFamily: FD, fontSize: 30, fontWeight: 800, color: C.forest }}>CJ</span>
            </div>
            <div>
              <h1 style={{ fontFamily: FD, fontSize: "clamp(28px,4.5vw,44px)", fontWeight: 800, color: "#ffffff", lineHeight: 1.1, marginBottom: 8 }}>CJ</h1>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Founder, HustleHub.ca", "Vancouver, BC", "EN / Punjabi/Hindi"].map(t => (
                  <span key={t} style={{ fontFamily: FB, fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 20, padding: "4px 12px" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
          <p style={{ fontFamily: FB, fontSize: "clamp(15px,2.2vw,17px)", color: "rgba(255,255,255,0.78)", lineHeight: 1.82, maxWidth: 580, marginBottom: 28 }}>
            CS & Engineering grad turned solopreneur. I built HustleHub because navigating Canadian benefits felt needlessly hard. Now helping 40,000+ Canadians a month claim what they are owed.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <a href="/contact" style={{ fontFamily: FB, fontSize: 14, fontWeight: 700, color: "#1a3a2a", background: "#e8960e", padding: "12px 24px", borderRadius: 11, textDecoration: "none" }}>Send a Message</a>
            <a href="/blog" style={{ fontFamily: FB, fontSize: 14, fontWeight: 600, color: "#ffffff", background: "rgba(255,255,255,0.11)", border: "1px solid rgba(255,255,255,0.24)", padding: "11px 22px", borderRadius: 11, textDecoration: "none" }}>Read My Articles</a>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "clamp(52px,6vw,76px) 24px 0" }}>
        <div style={{ marginBottom: 60 }}>
          <p style={{ fontFamily: FB, fontSize: 11, fontWeight: 700, color: C.amber, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>Background</p>
          <h2 style={{ fontFamily: FD, fontSize: "clamp(22px,3vw,30px)", fontWeight: 700, color: C.forest, marginBottom: 28 }}>Skills & Experience</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14 }}>
            {skills.map(({ icon, label, years }) => (
              <div key={label} style={{ background: C.white, borderRadius: 14, padding: "18px 20px", border: "1.5px solid #e8dcc8", display: "flex", gap: 14, alignItems: "center" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "#1a3a2a10", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontFamily: FD, fontSize: 14, fontWeight: 700, color: C.charcoal, marginBottom: 3 }}>{label}</div>
                  <div style={{ fontFamily: FM, fontSize: 10, color: C.mutedL, letterSpacing: "0.06em" }}>{years}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 80 }}>
          <p style={{ fontFamily: FB, fontSize: 11, fontWeight: 700, color: C.amber, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>Projects</p>
          <h2 style={{ fontFamily: FD, fontSize: "clamp(22px,3vw,30px)", fontWeight: 700, color: C.forest, marginBottom: 28 }}>What I Am Working On</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {projects.map(({ icon, name, desc, tag, color }) => (
              <div key={name} style={{ background: C.white, borderRadius: 16, padding: "24px 26px", border: "1.5px solid #e8dcc8", display: "flex", gap: 18, alignItems: "flex-start", flexWrap: "wrap" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: color + "12", border: "1.5px solid " + color + "25", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{icon}</div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
                    <h3 style={{ fontFamily: FD, fontSize: 17, fontWeight: 700, color: C.charcoal, margin: 0 }}>{name}</h3>
                    <span style={{ fontFamily: FM, fontSize: 10, fontWeight: 700, color: "#ffffff", background: color, borderRadius: 20, padding: "2px 10px", letterSpacing: "0.08em" }}>{tag}</span>
                  </div>
                  <p style={{ fontFamily: FB, fontSize: 14, color: C.muted, lineHeight: 1.68, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bottom-nav-spacer" />
    </main>
  );
}
