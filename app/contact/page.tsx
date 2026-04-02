"use client";
import { useState } from "react";
import { C, FD, FB, FM } from "../../styles/tokens";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", topic: "", msg: "" });
  const [sent, setSent] = useState(false);
  const topics = ["General Question", "Newsletter Signup", "Article Suggestion", "Benefits Help", "Partnership / Media", "Other"];

  return (
    <main style={{ background: C.cream, paddingTop: 64, minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ background: "linear-gradient(160deg,#1a3a2a,#2d5a42)", padding: "clamp(48px,6vw,68px) 24px clamp(36px,5vw,52px)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h1 style={{ fontFamily: FD, fontSize: "clamp(26px,4.5vw,44px)", fontWeight: 800, color: "#ffffff", lineHeight: 1.12, marginBottom: 14 }}>
            We Would Love to Hear From You
          </h1>
          <p style={{ fontFamily: FB, fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.72 }}>
            Questions about a benefit, article ideas, or just want to say hi.
          </p>
        </div>
      </div>

      {/* Quick info — mobile friendly row */}
      <div style={{ background: C.white, borderBottom: "1px solid #e8dcc8" }}>
        <div style={{ maxWidth: 1020, margin: "0 auto", padding: "20px 24px", display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center" }}>
          {[
            { icon: "📍", label: "Based in",       val: "Abbotsford, BC"         },
            { icon: "🕐", label: "Response time",  val: "Within 2 business days" },
            { icon: "🌐", label: "Coverage",       val: "All of Canada"          },
            { icon: "💬", label: "Languages",      val: "English & Punjabi"      },
          ].map(({ icon, label, val }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 160 }}>
              <span style={{ fontSize: 20 }}>{icon}</span>
              <div>
                <div style={{ fontFamily: FB, fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</div>
                <div style={{ fontFamily: FB, fontSize: 13, color: C.charcoal, marginTop: 1 }}>{val}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form — full width, centered */}
      <div style={{ maxWidth: 620, margin: "0 auto", padding: "clamp(32px,5vw,56px) 24px" }}>
        <div style={{ background: C.white, borderRadius: 20, padding: "clamp(24px,4vw,40px)", border: "1.5px solid #e8dcc8", boxShadow: "0 4px 24px rgba(26,58,42,0.07)" }}>
          <h2 style={{ fontFamily: FD, fontSize: "clamp(20px,3vw,24px)", fontWeight: 700, color: C.forest, marginBottom: 24 }}>Send a Message</h2>

          {sent ? (
            <div style={{ textAlign: "center", padding: "36px 0" }}>
              <div style={{ fontSize: 40, marginBottom: 14 }}>🍁</div>
              <h3 style={{ fontFamily: FD, fontSize: 20, fontWeight: 700, color: C.forest, marginBottom: 8 }}>Message Sent!</h3>
              <p style={{ fontFamily: FB, fontSize: 14, color: C.muted }}>We will get back to you within 2 business days.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); if (form.name && form.email && form.msg) setSent(true); }}
              style={{ display: "flex", flexDirection: "column", gap: 18 }}>

              {[
                { label: "Your Name",      key: "name",  type: "text",  placeholder: "Jane Smith"        },
                { label: "Email Address",  key: "email", type: "email", placeholder: "jane@example.ca"   },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label style={{ fontFamily: FB, fontSize: 11, fontWeight: 700, color: C.forest, letterSpacing: "0.06em", display: "block", marginBottom: 7, textTransform: "uppercase" }}>{label}</label>
                  <input type={type} value={form[key as keyof typeof form]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder} required
                    style={{ fontFamily: FB, fontSize: 15, padding: "13px 15px", borderRadius: 11, border: "1.5px solid #e8dcc8", background: C.cream, color: C.charcoal, width: "100%", minHeight: 48, outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}

              <div>
                <label style={{ fontFamily: FB, fontSize: 11, fontWeight: 700, color: C.forest, letterSpacing: "0.06em", display: "block", marginBottom: 7, textTransform: "uppercase" }}>Topic</label>
                <select value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })}
                  style={{ fontFamily: FB, fontSize: 15, padding: "13px 15px", borderRadius: 11, border: "1.5px solid #e8dcc8", background: C.cream, color: C.charcoal, width: "100%", minHeight: 48, outline: "none", appearance: "none", cursor: "pointer", boxSizing: "border-box" }}>
                  <option value="">Select a topic</option>
                  {topics.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontFamily: FB, fontSize: 11, fontWeight: 700, color: C.forest, letterSpacing: "0.06em", display: "block", marginBottom: 7, textTransform: "uppercase" }}>Message</label>
                <textarea value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })}
                  placeholder="What is on your mind?" required rows={5}
                  style={{ fontFamily: FB, fontSize: 15, padding: "13px 15px", borderRadius: 11, border: "1.5px solid #e8dcc8", background: C.cream, color: C.charcoal, width: "100%", outline: "none", resize: "vertical", lineHeight: 1.65, boxSizing: "border-box" }} />
              </div>

              <button type="submit" style={{ fontFamily: FB, fontSize: 15, fontWeight: 700, color: C.white, background: C.forest, border: "none", borderRadius: 12, padding: "15px", cursor: "pointer", minHeight: 52, marginTop: 4 }}>
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="bottom-nav-spacer" />
    </main>
  );
}
