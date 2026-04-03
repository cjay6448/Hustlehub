import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ background: "#fdf8f0", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px" }}>
      <div style={{ textAlign: "center", maxWidth: 520 }}>
        <div style={{ fontSize: 80, marginBottom: 24 }}>🍁</div>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(28px,5vw,44px)", fontWeight: 800, color: "#1a3a2a", marginBottom: 12, lineHeight: 1.2 }}>
          Page Not Found
        </h1>
        <p style={{ fontFamily: "Segoe UI, sans-serif", fontSize: 16, color: "#7a7060", lineHeight: 1.75, marginBottom: 12 }}>
          This page seems to have gone missing — like a tax refund that never arrived.
        </p>
        <p style={{ fontFamily: "Segoe UI, sans-serif", fontSize: 14, color: "#b0a898", lineHeight: 1.7, marginBottom: 36 }}>
          Check the URL or head back home. There are 120+ guides waiting for you.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" style={{ fontFamily: "Segoe UI, sans-serif", fontSize: 15, fontWeight: 700, color: "#ffffff", background: "#1a3a2a", borderRadius: 12, padding: "14px 28px", textDecoration: "none", boxShadow: "0 4px 18px rgba(26,58,42,0.28)" }}>
            Go Home
          </Link>
          <Link href="/blog" style={{ fontFamily: "Segoe UI, sans-serif", fontSize: 15, fontWeight: 600, color: "#1a3a2a", border: "1.5px solid rgba(26,58,42,0.25)", borderRadius: 12, padding: "13px 26px", textDecoration: "none" }}>
            Browse Articles
          </Link>
        </div>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 40, flexWrap: "wrap" }}>
          {["No ads", "CRA-sourced", "Free forever"].map((t) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#e8960e" }} />
              <span style={{ fontFamily: "Segoe UI, sans-serif", fontSize: 12, color: "#b0a898" }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
