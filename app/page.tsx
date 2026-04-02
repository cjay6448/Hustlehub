"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { C, FD, FB, FM } from "../styles/tokens";

const POSTS = [
  { id: 1, cat: "Benefits",            tag: "CRA",      color: "#1a3a2a", title: "The GST/HST Credit: Who Qualifies and How to Maximize It",           date: "Mar 18, 2026", read: "6 min" },
  { id: 2, cat: "Investing",           tag: "TFSA",     color: "#c97a0a", title: "TFSA vs RRSP in 2026: The Decision Tree Every Canadian Needs",         date: "Mar 11, 2026", read: "9 min" },
  { id: 3, cat: "Government Benefits", tag: "CCB",      color: "#2d5a42", title: "Canada Child Benefit 2026: New Amounts and Hidden Add-Ons",            date: "Mar 4, 2026",  read: "7 min" },
  { id: 4, cat: "Side Income",         tag: "Self-Emp", color: "#5a3e28", title: "Self-Employed in Canada? The 11 Deductions You Are Missing",           date: "Feb 25, 2026", read: "8 min" },
  { id: 5, cat: "Housing",             tag: "FHSA",     color: "#2a5a6a", title: "First Home Savings Account: The Complete 2026 Guide for BC Residents", date: "Feb 17, 2026", read: "10 min" },
];

function Maple({ size = 22, color = C.amber }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill={color}>
      <path d="M50 5L57 30L75 20L65 40L90 38L72 55L80 80L60 68L50 90L40 68L20 80L28 55L10 38L35 40L25 20L43 30Z" />
    </svg>
  );
}

function NewsletterPopup({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <AnimatePresence>
      <motion.div key="bd"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: "fixed", inset: 0, zIndex: 1100, background: "rgba(37,34,32,0.6)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
      />
      <div style={{ position: "fixed", inset: 0, zIndex: 1101, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", pointerEvents: "none" }}>
        <motion.div key="card"
          initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: "100%", maxWidth: 480, background: C.charcoal, borderRadius: 24, overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.45)", pointerEvents: "all", position: "relative" }}>
          <div style={{ height: 4, background: "linear-gradient(90deg,#c97a0a,#e8960e)" }} />
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, width: 32, height: 32, borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.12)", color: "#ffffff", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>x</button>
          <div style={{ padding: "32px 32px 28px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(232,150,14,0.15)", border: "1px solid rgba(232,150,14,0.3)", borderRadius: 20, padding: "4px 12px", marginBottom: 16 }}>
              <Maple size={11} color={C.amberL} />
              <span style={{ fontFamily: FM, fontSize: 10, fontWeight: 700, color: C.amberL, letterSpacing: "0.14em", textTransform: "uppercase" }}>Free Weekly Newsletter</span>
            </div>
            {done ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🍁</div>
                <p style={{ fontFamily: FD, fontSize: 20, fontWeight: 700, color: "#ffffff", marginBottom: 8 }}>You are in!</p>
                <p style={{ fontFamily: FB, fontSize: 14, color: "rgba(255,255,255,0.6)" }}>First issue lands Tuesday morning.</p>
              </div>
            ) : (
              <>
                <h2 style={{ fontFamily: FD, fontSize: "clamp(20px,3.5vw,26px)", fontWeight: 800, color: "#ffffff", lineHeight: 1.18, marginBottom: 10 }}>
                  Do not leave money on the table.
                </h2>
                <p style={{ fontFamily: FB, fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.72, marginBottom: 22 }}>
                  40,000+ Canadians get CRA updates, benefit deadlines, and one money move every Tuesday. Free always.
                </p>
                <form onSubmit={e => { e.preventDefault(); if (email) setDone(true); }} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.ca" required
                    style={{ fontFamily: FB, fontSize: 15, padding: "13px 16px", borderRadius: 11, border: "1.5px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)", color: "#ffffff", outline: "none", minHeight: 48 }} />
                  <button type="submit" style={{ fontFamily: FB, fontSize: 15, fontWeight: 700, background: "linear-gradient(135deg,#c97a0a,#e8960e)", color: "#1a3a2a", border: "none", borderRadius: 11, padding: "13px", minHeight: 48, cursor: "pointer" }}>
                    Get My Free Weekly Update
                  </button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function FeaturedCarousel(): JSX.Element {
  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const pausedRef = useRef(false);
  const posRef = useRef(0);
  const SPEED = 0.5;
  const all = [...POSTS, ...POSTS];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const step = () => {
      if (!pausedRef.current) {
        posRef.current += SPEED;
        const half = track.scrollWidth / 2;
        if (posRef.current >= half) posRef.current = 0;
        track.style.transform = "translateX(-" + posRef.current + "px)";
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      onTouchStart={() => { pausedRef.current = true; }}
      onTouchEnd={() => { pausedRef.current = false; }}
      style={{ overflow: "hidden", cursor: "grab" }}
    >
      <div ref={trackRef} style={{ display: "flex", gap: 18, width: "max-content" }}>
        {all.map((post, i) => (
          <a key={i} href="/blog" style={{
            width: 290, flexShrink: 0, background: "#ffffff",
            borderRadius: 18, overflow: "hidden", textDecoration: "none",
            border: "1.5px solid #e8dcc8", boxShadow: "0 2px 14px rgba(26,58,42,0.06)",
            display: "flex", flexDirection: "column",
          }}>
            <div style={{ height: 110, background: "linear-gradient(150deg," + post.color + "," + post.color + "99)", position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end", padding: "14px 16px" }}>
              <div style={{ background: "rgba(255,255,255,0.18)", borderRadius: 6, padding: "3px 10px" }}>
                <span style={{ fontFamily: FM, fontSize: 10, fontWeight: 700, color: "#ffffff", letterSpacing: "0.12em" }}>{post.tag}</span>
              </div>
            </div>
            <div style={{ padding: "14px 16px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontFamily: FB, fontSize: 10, fontWeight: 700, color: post.color, letterSpacing: "0.14em", textTransform: "uppercase" }}>{post.cat}</span>
              <h3 style={{ fontFamily: FD, fontSize: 14, fontWeight: 700, color: "#252220", lineHeight: 1.35, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{post.title}</h3>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "auto", paddingTop: 10, borderTop: "1px solid #f2e8d8" }}>
                <span style={{ fontFamily: FB, fontSize: 11, color: "#b0a898" }}>{post.date}</span>
                <span style={{ fontFamily: FM, fontSize: 11, fontWeight: 700, color: post.color }}>{post.read}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const popupShown = useRef(false);

  useEffect(() => {
    const trigger = () => {
      if (popupShown.current) return;
      popupShown.current = true;
      setShowPopup(true);
    };
    const onScroll = () => {
      const el = document.scrollingElement || document.documentElement;
      if (el.scrollTop / (el.scrollHeight - el.clientHeight) >= 0.38) trigger();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const timer = setTimeout(trigger, 5000);
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(timer); };
  }, []);

  const stats = [
    { n: "40K+", l: "Monthly Readers" },
    { n: "120+", l: "Articles Published" },
    { n: "100%", l: "Canadian Content" },
    { n: "Free", l: "Always & Forever" },
  ];

  const pillars = [
    { icon: "🏛", title: "Government Benefits", body: "CRA credits, provincial programs, every payment you are entitled to." },
    { icon: "📈", title: "Smart Investing",      body: "TFSA, RRSP, FHSA strategies for Canadian tax brackets." },
    { icon: "💼", title: "Side Income & Tax",    body: "Self-employment, gig work, deductions most Canadians never claim." },
    { icon: "🏠", title: "Housing & Homebuying", body: "First-time buyer grants, BC programs, mortgage math made simple." },
  ];

  return (
    <main style={{ background: C.cream }}>
      <AnimatePresence>{showPopup && <NewsletterPopup onClose={() => setShowPopup(false)} />}</AnimatePresence>

      {/* Hero */}
      <div style={{ minHeight: "91vh", background: "linear-gradient(165deg,#fdf8f0,#f2e8d8)", display: "flex", alignItems: "center", paddingTop: 64, position: "relative" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "clamp(44px,6vw,64px) 24px", position: "relative", zIndex: 1 }}>
          <h1 style={{ fontFamily: FD, fontSize: "clamp(32px,5.5vw,58px)", fontWeight: 800, color: C.forest, lineHeight: 1.1, marginBottom: 20 }}>
            Every Dollar You Are Owed.
            <br />
            <em style={{ color: C.amber, fontStyle: "italic" }}>In Plain English.</em>
          </h1>
          <p style={{ fontFamily: FB, fontSize: "clamp(15px,2.2vw,18px)", color: C.muted, lineHeight: 1.78, marginBottom: 32, maxWidth: 520 }}>
            HustleHub.ca helps Canadians navigate government benefits, tax credits, and personal finance without the confusion or the advisor fees.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="/blog" style={{ fontFamily: FB, fontSize: 15, fontWeight: 700, color: C.white, background: C.forest, borderRadius: 11, padding: "14px 28px", textDecoration: "none" }}>Browse Articles</a>
            <a href="/contact" style={{ fontFamily: FB, fontSize: 15, fontWeight: 600, color: C.forest, border: "2px solid #1a3a2a", borderRadius: 11, padding: "13px 26px", textDecoration: "none" }}>Get Free Newsletter</a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: C.forest, padding: "28px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {stats.map(({ n, l }) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: FD, fontSize: "clamp(22px,3vw,28px)", fontWeight: 800, color: C.amberL }}>{n}</div>
              <div style={{ fontFamily: FB, fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured carousel */}
      <div style={{ background: C.creamD, padding: "clamp(52px,6vw,68px) 0" }}>
        <div style={{ maxWidth: 1020, margin: "0 auto", padding: "0 24px 20px" }}>
          <p style={{ fontFamily: FB, fontSize: 11, fontWeight: 700, color: C.amber, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>Featured Reading</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <h2 style={{ fontFamily: FD, fontSize: "clamp(22px,3.2vw,32px)", fontWeight: 700, color: C.forest, margin: 0 }}>Start Here</h2>
            <a href="/blog" style={{ fontFamily: FB, fontSize: 13, fontWeight: 600, color: C.forest, border: "1.5px solid #1a3a2a", borderRadius: 9, padding: "8px 18px", textDecoration: "none" }}>View All</a>
          </div>
        </div>
        {/* Peek effect: padding on both sides so partial cards show at edges */}
        <div style={{ position: "relative" }}>
          {/* Left fade */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, zIndex: 10, pointerEvents: "none", background: "linear-gradient(to right,#f2e8d8,transparent)" }} />
          {/* Right fade */}
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, zIndex: 10, pointerEvents: "none", background: "linear-gradient(to left,#f2e8d8,transparent)" }} />
          <div style={{ paddingLeft: 60, paddingRight: 60, overflow: "hidden" }}>
            <FeaturedCarousel />
          </div>
        </div>
        <p style={{ fontFamily: FB, fontSize: 11, color: C.muted, textAlign: "center", marginTop: 16, letterSpacing: "0.06em" }}>Hover to pause · Swipe to browse</p>
      </div>

      {/* Pillars */}
      <div style={{ background: C.cream, padding: "clamp(56px,7vw,88px) 24px" }}>
        <div style={{ maxWidth: 1020, margin: "0 auto" }}>
          <h2 style={{ fontFamily: FD, fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 700, color: C.forest, textAlign: "center", marginBottom: 44 }}>
            Everything Canadian Finance, Nothing Else
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 18 }}>
            {pillars.map(({ icon, title, body }) => (
              <a key={title} href="/blog" style={{ background: C.white, borderRadius: 16, padding: "26px 22px", border: "1.5px solid #e8dcc8", textDecoration: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: 28 }}>{icon}</span>
                <h3 style={{ fontFamily: FD, fontSize: 16, fontWeight: 700, color: C.forest, margin: 0 }}>{title}</h3>
                <p style={{ fontFamily: FB, fontSize: 13, color: C.muted, lineHeight: 1.65, margin: 0 }}>{body}</p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter banner */}
      <div style={{ background: "#f2e8d8", padding: "clamp(52px,6vw,76px) 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", background: "linear-gradient(135deg,#1a3a2a,#2d5a42)", borderRadius: 24, padding: "clamp(36px,5vw,52px)", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg,#c97a0a,#e8960e)", borderRadius: "24px 24px 0 0" }} />
          <h2 style={{ fontFamily: FD, fontSize: "clamp(22px,3.5vw,36px)", fontWeight: 800, color: "#ffffff", lineHeight: 1.15, marginBottom: 16 }}>
            The Canadian money newsletter that actually explains things.
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
            {["CRA deadlines you cannot miss", "Benefit updates in plain English", "One money move per week"].map(t => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.amberL, flexShrink: 0 }} />
                <span style={{ fontFamily: FB, fontSize: 13, color: "rgba(255,255,255,0.72)" }}>{t}</span>
              </div>
            ))}
          </div>
          <form onSubmit={e => e.preventDefault()} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input type="email" placeholder="your@email.ca" style={{ flex: "1 1 220px", fontFamily: FB, fontSize: 14, padding: "12px 16px", borderRadius: 10, border: "1.5px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.09)", color: "#ffffff", outline: "none", minHeight: 44 }} />
            <button type="submit" style={{ fontFamily: FB, fontSize: 14, fontWeight: 700, padding: "12px 24px", background: "linear-gradient(135deg,#c97a0a,#e8960e)", color: "#1a3a2a", border: "none", borderRadius: 10, minHeight: 44, cursor: "pointer" }}>Subscribe Free</button>
          </form>
        </div>
      </div>

      <div className="bottom-nav-spacer" />
    </main>
  );
}
