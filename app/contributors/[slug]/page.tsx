import { C, FD, FB, FM } from "../../../styles/tokens";

export default function ContributorPage({ params }: { params: { slug: string } }) {
  return (
    <main style={{ background: C.cream, paddingTop: 64, minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(160deg,#1a3a2a,#2d5a42)", padding: "clamp(48px,6vw,68px) 24px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#c97a0a", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
            <span style={{ fontFamily: FD, fontSize: 24, fontWeight: 800, color: "#1a3a2a" }}>CPA</span>
          </div>
          <h1 style={{ fontFamily: FD, fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, color: "#ffffff", marginBottom: 8 }}>Contributor Profile</h1>
          <p style={{ fontFamily: FB, fontSize: 15, color: "rgba(255,255,255,0.72)" }}>Expert contributor at HustleHub.ca</p>
        </div>
      </div>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "clamp(44px,6vw,64px) 24px" }}>
        <div style={{ background: "#ffffff", borderRadius: 16, padding: "32px", border: "1.5px solid #e8dcc8", marginBottom: 32 }}>
          <h2 style={{ fontFamily: FD, fontSize: 22, fontWeight: 700, color: C.forest, marginBottom: 20 }}>Get in Touch</h2>
          <p style={{ fontFamily: FB, fontSize: 15, color: C.muted, lineHeight: 1.72, marginBottom: 24 }}>
            Have a question for this contributor? Send them a message directly.
          </p>
          <form onSubmit={e => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <input type="text" placeholder="Your name" style={{ fontFamily: FB, fontSize: 15, padding: "12px 15px", borderRadius: 10, border: "1.5px solid #e8dcc8", background: "#fdf8f0", outline: "none", minHeight: 44 }} />
            <input type="email" placeholder="your@email.ca" style={{ fontFamily: FB, fontSize: 15, padding: "12px 15px", borderRadius: 10, border: "1.5px solid #e8dcc8", background: "#fdf8f0", outline: "none", minHeight: 44 }} />
            <textarea placeholder="Your question..." rows={4} style={{ fontFamily: FB, fontSize: 15, padding: "12px 15px", borderRadius: 10, border: "1.5px solid #e8dcc8", background: "#fdf8f0", outline: "none", resize: "vertical" }} />
            <button type="submit" style={{ fontFamily: FB, fontSize: 15, fontWeight: 700, color: "#ffffff", background: C.forest, border: "none", borderRadius: 11, padding: "14px", cursor: "pointer" }}>Send Message</button>
          </form>
        </div>
        <a href="/contributors" style={{ fontFamily: FB, fontSize: 14, color: C.forest, textDecoration: "none", fontWeight: 600 }}>Back to All Contributors</a>
      </div>
      <div className="bottom-nav-spacer" />
    </main>
  );
}
