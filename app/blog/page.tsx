export default function BlogPage() {
  return (
    <main style={{ background: "#fdf8f0", paddingTop: 64, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1020, margin: "0 auto", padding: "clamp(48px,6vw,72px) 24px" }}>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, color: "#1a3a2a", marginBottom: 16 }}>
          The HustleHub Blog
        </h1>
        <p style={{ fontSize: 16, color: "#7a7060", lineHeight: 1.7, marginBottom: 40 }}>
          Benefits guides, investing primers, and tax tips written for real Canadians.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
          {[
            { cat: "Benefits", tag: "CRA", title: "The GST/HST Credit: Who Qualifies and How to Maximize It", date: "Mar 18, 2026", read: "6 min", color: "#1a3a2a" },
            { cat: "Investing", tag: "TFSA", title: "TFSA vs RRSP in 2026: The Decision Tree Every Canadian Needs", date: "Mar 11, 2026", read: "9 min", color: "#c97a0a" },
            { cat: "Government Benefits", tag: "CCB", title: "Canada Child Benefit 2026: New Amounts and Hidden Add-Ons", date: "Mar 4, 2026", read: "7 min", color: "#2d5a42" },
            { cat: "Side Income", tag: "Self-Emp", title: "Self-Employed in Canada? The 11 Deductions You Are Missing", date: "Feb 25, 2026", read: "8 min", color: "#5a3e28" },
            { cat: "Housing", tag: "FHSA", title: "First Home Savings Account: The Complete 2026 Guide for BC", date: "Feb 17, 2026", read: "10 min", color: "#2a5a6a" },
            { cat: "Benefits", tag: "EI", title: "Employment Insurance in BC: Your Full Entitlement Checklist", date: "Feb 10, 2026", read: "5 min", color: "#4a3060" },
          ].map((post) => (
            <a key={post.title} href="/blog/article" style={{ background: "#ffffff", borderRadius: 16, overflow: "hidden", textDecoration: "none", display: "flex", flexDirection: "column", border: "1.5px solid #e8dcc8", boxShadow: "0 2px 10px rgba(26,58,42,0.05)" }}>
              <div style={{ height: 5, background: post.color }} />
              <div style={{ padding: "20px 20px 22px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: post.color, letterSpacing: "0.14em", textTransform: "uppercase" }}>{post.cat}</span>
                <h3 style={{ fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 700, color: "#252220", lineHeight: 1.35, margin: 0 }}>{post.title}</h3>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "auto", paddingTop: 12, borderTop: "1px solid #f2e8d8" }}>
                  <span style={{ fontSize: 12, color: "#b0a898" }}>{post.date}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: post.color }}>{post.read} read</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="bottom-nav-spacer" />
    </main>
  );
}
