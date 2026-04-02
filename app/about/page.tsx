import { C, FD, FB, FM } from "../../styles/tokens";

export const metadata = {
  title: "About HustleHub.ca",
  description: "HustleHub.ca is an independent Canadian personal finance site. No ads, no sponsors, just plain English money guides.",
};

export default function AboutPage() {
  const values = [
    { icon: "🇨🇦", title: "100% Canadian", body: "Every article written with CRA rules, provincial programs, and Canadian tax law in mind.", accent: C.forest },
    { icon: "🔍", title: "Plain Language First", body: "If a Grade 10 student cannot understand it, we rewrite it. Financial literacy should not require a finance degree.", accent: C.amber },
    { icon: "🚫", title: "No Sponsors. Ever.", body: "We do not take money from banks, brokerages, or insurance companies. Our only loyalty is to you.", accent: C.forest },
    { icon: "📬", title: "Community-Driven", body: "Our best ideas come from newsletter readers. Reply to any email and it reaches a real human in Abbotsford, BC.", accent: C.amber },
  ];

  const timeline = [
    { yr: "2022", title: "Started as a personal spreadsheet", body: "Tracking every BC benefit available, originally just for friends and family.", dot: C.forestLight },
    { yr: "2023", title: "HustleHub.ca launched", body: "First post: the GST/HST credit explainer still gets thousands of hits every month.", dot: C.forestMid },
    { yr: "2024", title: "Grew to 20K monthly readers", body: "Added TFSA/RRSP deep-dives and provincial benefit guides. The weekly newsletter launched.", dot: C.amber },
    { yr: "2026", title: "Still independent, still free", body: "No ads. No affiliate paywalls. Just Canadians helping Canadians understand their money.", dot: C.amberL },
  ];

  const stats = [
    { n: "40K+", l: "Monthly Readers" },
    { n: "120+", l: "Articles Published" },
    { n: "2023", l: "Year Founded" },
    { n: "Free", l: "Always & Forever" },
  ];

  return (
    <main style={{ background: C.cream, paddingTop: 64 }}>

      <div style={{ background: "linear-gradient(150deg,#1a3a2a,#2d5a42)", padding: "clamp(56px,7vw,80px) 24px clamp(48px,6vw,64px)", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <h1 style={{ fontFamily: FD, fontSize: "clamp(30px,5vw,52px)", fontWeight: 800, color: "#ffffff", lineHeight: 1.1, marginBottom: 20 }}>
            Built by a Canadian,
            <br />
            <em style={{ fontStyle: "italic", color: C.amberL }}>For Canadians</em>
          </h1>
          <p style={{ fontFamily: FB, fontSize: "clamp(15px,2.2vw,17px)", color: "rgba(255,255,255,0.75)", lineHeight: 1.82, maxWidth: 560, marginBottom: 32 }}>
            HustleHub started because navigating Canadian benefits felt needlessly complicated. Fixing that, one plain-English article at a time.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {["No ads", "No sponsored content", "CRA-sourced", "Updated weekly"].map(t => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 20, padding: "5px 13px" }}>
                <span style={{ color: C.amberL, fontSize: 11 }}>✓</span>
                <span style={{ fontFamily: FB, fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.82)" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: C.charcoal, padding: "22px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
          {stats.map(({ n, l }) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: FD, fontSize: "clamp(20px,2.8vw,26px)", fontWeight: 800, color: C.amberL }}>{n}</div>
              <div style={{ fontFamily: FB, fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 920, margin: "0 auto", padding: "clamp(56px,7vw,80px) 24px 0" }}>

        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <p style={{ fontFamily: FB, fontSize: 11, fontWeight: 700, color: C.amber, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>Our Principles</p>
          <h2 style={{ fontFamily: FD, fontSize: "clamp(24px,3.5vw,34px)", fontWeight: 700, color: C.forest, lineHeight: 1.2 }}>What We Stand For</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 18, marginBottom: 72 }}>
          {values.map(({ icon, title, body, accent }) => (
            <div key={title} style={{ background: C.white, borderRadius: 18, padding: "28px 26px", border: "1.5px solid #e8dcc8" }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: accent + "12", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 18 }}>{icon}</div>
              <div style={{ width: 28, height: 3, borderRadius: 2, background: accent, marginBottom: 16 }} />
              <h3 style={{ fontFamily: FD, fontSize: 18, fontWeight: 700, color: C.forest, marginBottom: 10 }}>{title}</h3>
              <p style={{ fontFamily: FB, fontSize: 14, color: C.muted, lineHeight: 1.72, margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: C.white, borderRadius: 20, border: "1.5px solid #e8dcc8", overflow: "hidden", marginBottom: 72 }}>
          <div style={{ height: 4, background: "linear-gradient(90deg,#1a3a2a,#c97a0a)" }} />
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div style={{ background: "linear-gradient(160deg,#1a3a2a,#2d5a42)", padding: "clamp(28px,4vw,40px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minWidth: 200, flexShrink: 0 }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#c97a0a,#e8960e)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <span style={{ fontFamily: FD, fontSize: 28, fontWeight: 800, color: "#1a3a2a" }}>CJ</span>
              </div>
              <div style={{ fontFamily: FD, fontSize: 16, fontWeight: 700, color: "#ffffff" }}>CJ</div>
              <div style={{ fontFamily: FM, fontSize: 10, color: C.amberL, letterSpacing: "0.12em", marginTop: 4 }}>FOUNDER</div>
              <div style={{ fontFamily: FB, fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 6 }}>Abbotsford, BC</div>
            </div>
            <div style={{ padding: "clamp(24px,4vw,40px)", flex: 1, minWidth: 200 }}>
              <h3 style={{ fontFamily: FD, fontSize: "clamp(18px,2.5vw,24px)", fontWeight: 700, color: C.forest, marginBottom: 16 }}>Why I Built HustleHub</h3>
              <p style={{ fontFamily: FB, fontSize: 15, color: C.charcoal, lineHeight: 1.82, marginBottom: 14 }}>
                I started HustleHub after spending hours trying to figure out which government benefits my family qualified for. The information existed but was buried in CRA jargon.
              </p>
              <p style={{ fontFamily: FB, fontSize: 14, color: C.muted, lineHeight: 1.82, marginBottom: 24 }}>
                Today HustleHub reaches 40,000+ Canadians every month. Every article is written from scratch, no AI filler, no recycled US content.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                <a href="/contact" style={{ fontFamily: FB, fontSize: 13, fontWeight: 700, color: "#ffffff", background: C.forest, padding: "10px 20px", borderRadius: 10, textDecoration: "none" }}>Send a Message</a>
                <a href="/founder" style={{ fontFamily: FB, fontSize: 13, fontWeight: 700, color: C.forest, border: "1.5px solid #1a3a2a", padding: "10px 20px", borderRadius: 10, textDecoration: "none" }}>Meet the Founder</a>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 80 }}>
          <h2 style={{ fontFamily: FD, fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, color: C.forest, marginBottom: 36 }}>How HustleHub Grew</h2>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 27, top: 28, bottom: 28, width: 2, background: "linear-gradient(to bottom,#3d7a58,#e8960e)", opacity: 0.25, borderRadius: 2 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {timeline.map(({ yr, title, body, dot }) => (
                <div key={yr} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#ffffff", border: "2.5px solid " + dot, flexShrink: 0, zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: FM, fontSize: 11, fontWeight: 700, color: C.forest }}>{yr}</span>
                  </div>
                  <div style={{ paddingTop: 14, flex: 1 }}>
                    <h3 style={{ fontFamily: FD, fontSize: 16, fontWeight: 700, color: C.charcoal, marginBottom: 6 }}>{title}</h3>
                    <p style={{ fontFamily: FB, fontSize: 14, color: C.muted, lineHeight: 1.68, margin: 0 }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: "linear-gradient(135deg,#1a3a2a,#2d5a42)", padding: "clamp(48px,6vw,68px) 24px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: FD, fontSize: "clamp(22px,3.5vw,30px)", fontWeight: 700, color: "#ffffff", marginBottom: 12 }}>
            Ready to Claim Every Dollar You Are Owed?
          </h2>
          <p style={{ fontFamily: FB, fontSize: 15, color: "rgba(255,255,255,0.72)", marginBottom: 28, lineHeight: 1.75 }}>
            Join 40,000+ Canadians getting weekly benefit updates in plain English. Free, always.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/contact" style={{ fontFamily: FB, fontSize: 15, fontWeight: 700, color: "#1a3a2a", background: "#e8960e", padding: "14px 30px", borderRadius: 12, textDecoration: "none" }}>Subscribe Free</a>
            <a href="/blog" style={{ fontFamily: FB, fontSize: 15, fontWeight: 600, color: "#ffffff", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", padding: "13px 28px", borderRadius: 12, textDecoration: "none" }}>Browse Articles</a>
          </div>
        </div>
      </div>

      <div className="bottom-nav-spacer" />
    </main>
  );
}
