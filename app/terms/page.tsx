import { C, FD, FB } from "../../styles/tokens";

export const metadata = {
  title: "Terms of Use | HustleHub.ca",
};

export default function TermsPage() {
  const sections = [
    { title: "Acceptance of Terms", body: "By accessing or using HustleHub.ca, you agree to be bound by these Terms of Use." },
    { title: "Educational Purpose Only", body: "All content on HustleHub.ca is for general educational and informational purposes only. Nothing constitutes tax advice, legal advice, financial advice, or investment advice." },
    { title: "No Guarantee of Accuracy", body: "While we strive for accuracy, tax laws and benefit amounts change frequently. Always verify critical information with the CRA directly at cra-arc.gc.ca or by calling 1-800-959-8281." },
    { title: "Not Affiliated with the Government", body: "HustleHub.ca is a privately operated independent website. We are not affiliated with, endorsed by, or connected to the Canada Revenue Agency or the Government of Canada." },
    { title: "Intellectual Property", body: "All original content on HustleHub.ca is protected by copyright. You may share links freely. Reproducing full articles without permission is not permitted." },
    { title: "Limitation of Liability", body: "To the fullest extent permitted by Canadian law, HustleHub.ca shall not be liable for any damages arising from your use of this website." },
    { title: "Governing Law", body: "These Terms are governed by the laws of the Province of British Columbia and the federal laws of Canada." },
  ];

  return (
    <main style={{ background: C.cream, paddingTop: 64, minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(135deg,#f2e8d8,#fdf8f0)", padding: "clamp(48px,6vw,68px) 24px clamp(36px,5vw,52px)", borderBottom: "1px solid #e8dcc8" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h1 style={{ fontFamily: FD, fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, color: C.forest, lineHeight: 1.15, marginBottom: 14 }}>Terms of Use</h1>
          <p style={{ fontFamily: FB, fontSize: 14, color: C.muted }}>Effective: January 1, 2026</p>
        </div>
      </div>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "clamp(44px,6vw,64px) 24px" }}>
        <div style={{ background: "#f0f6ff", border: "1.5px solid #4a7ab5", borderRadius: 14, padding: "18px 22px", marginBottom: 40, display: "flex", gap: 12 }}>
          <span style={{ fontSize: 20 }}>🏛</span>
          <p style={{ fontFamily: FB, fontSize: 14, color: C.charcoal, lineHeight: 1.7, margin: 0 }}>
            <strong>Plain English Summary:</strong> HustleHub is for education only, not tax advice. We are not the CRA. Always double-check numbers with the government directly.
          </p>
        </div>
        {sections.map(({ title, body }, i) => (
          <div key={title} style={{ borderBottom: "1px solid #e8dcc8", paddingBottom: 30, marginBottom: 30 }}>
            <h2 style={{ fontFamily: FD, fontSize: "clamp(17px,2.5vw,20px)", fontWeight: 700, color: C.forest, marginBottom: 12 }}>{i + 1}. {title}</h2>
            <p style={{ fontFamily: FB, fontSize: 15, color: C.muted, lineHeight: 1.82, margin: 0 }}>{body}</p>
          </div>
        ))}
        <a href="/contact" style={{ display: "inline-block", fontFamily: FB, fontSize: 14, fontWeight: 700, color: C.white, background: C.forest, padding: "12px 22px", borderRadius: 11, textDecoration: "none" }}>Contact Us</a>
      </div>
      <div className="bottom-nav-spacer" />
    </main>
  );
}
