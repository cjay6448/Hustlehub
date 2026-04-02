import { C, FD, FB } from "../../styles/tokens";

export const metadata = {
  title: "Privacy Policy | HustleHub.ca",
  description: "HustleHub.ca privacy policy. We only collect your email for the newsletter. We never sell your data.",
};

export default function PrivacyPage() {
  const sections = [
    { title: "Information We Collect", body: "When you subscribe to our newsletter, we collect your email address and the subscription date. If you use our contact form, we collect your name, email, and message. We use privacy-respecting, cookieless analytics that shows us page visit counts but not who you are." },
    { title: "How We Use Your Information", body: "Your email is used exclusively to send the HustleHub weekly newsletter. We never sell, rent, share, or disclose your personal information to third parties." },
    { title: "Email Newsletter", body: "By subscribing, you consent to receive weekly emails from HustleHub.ca. Unsubscribe at any time via the link in every email." },
    { title: "Canadian Privacy Law (PIPEDA)", body: "HustleHub.ca operates in compliance with the Personal Information Protection and Electronic Documents Act (PIPEDA). You have the right to access, correct, or withdraw consent for your personal information at any time." },
    { title: "Disclaimer", body: "The content on HustleHub.ca is for general educational purposes only, not tax advice, legal advice, or financial advice. Always verify information with the CRA directly or consult a licensed Canadian tax professional." },
    { title: "Contact", body: "Questions about this privacy policy? Use our contact form. We will respond within 2 business days." },
  ];

  return (
    <main style={{ background: C.cream, paddingTop: 64, minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(135deg,#f2e8d8,#fdf8f0)", padding: "clamp(48px,6vw,68px) 24px clamp(36px,5vw,52px)", borderBottom: "1px solid #e8dcc8" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h1 style={{ fontFamily: FD, fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, color: C.forest, lineHeight: 1.15, marginBottom: 14 }}>Privacy Policy</h1>
          <p style={{ fontFamily: FB, fontSize: 14, color: C.muted }}>Effective: January 1, 2026</p>
        </div>
      </div>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "clamp(44px,6vw,64px) 24px" }}>
        <div style={{ background: "#fef4e0", border: "1.5px solid #e8d5a0", borderRadius: 14, padding: "18px 22px", marginBottom: 40, display: "flex", gap: 12 }}>
          <span style={{ fontSize: 20 }}>🍁</span>
          <p style={{ fontFamily: FB, fontSize: 14, color: C.charcoal, lineHeight: 1.7, margin: 0 }}>
            <strong>Plain English Summary:</strong> We only collect your email for the newsletter. We never sell your data. No tracking cookies. Unsubscribe anytime with one click.
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
