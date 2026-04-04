"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { C, FD, FB, FM } from "../styles/tokens";

function Maple({ size = 22, color = C.amber }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill={color}>
      <path d="M50 5L57 30L75 20L65 40L90 38L72 55L80 80L60 68L50 90L40 68L20 80L28 55L10 38L35 40L25 20L43 30Z" />
    </svg>
  );
}

function CountUp({ target, prefix = "" }: { target: number; prefix?: string }) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  const rafRef = useRef<number>(0);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const dur = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);
  return <>{prefix}{val.toLocaleString()}</>;
}

function CountUpK({ target }: { target: number }) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  const rafRef = useRef<number>(0);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const dur = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);
  return <>{val}K+</>;
}

function NewsletterPopup({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <AnimatePresence>
      <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
        style={{ position: "fixed", inset: 0, zIndex: 1100, background: "rgba(37,34,32,0.6)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 1101, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", pointerEvents: "none" }}>
        <motion.div key="card" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: "100%", maxWidth: 480, background: C.charcoal, borderRadius: 24, overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.45)", pointerEvents: "all", position: "relative" }}>
          <div style={{ height: 4, background: "linear-gradient(90deg,#c97a0a,#e8960e)" }} />
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, width: 32, height: 32, borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.12)", color: C.white, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>x</button>
          <div style={{ padding: "32px 32px 28px" }}>
            {done ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🍁</div>
                <p style={{ fontFamily: FD, fontSize: 20, fontWeight: 700, color: C.white, marginBottom: 8 }}>You are in!</p>
                <p style={{ fontFamily: FB, fontSize: 14, color: "rgba(255,255,255,0.6)" }}>First issue lands Tuesday morning.</p>
              </div>
            ) : (
              <>
                <h2 style={{ fontFamily: FD, fontSize: "clamp(20px,3.5vw,26px)", fontWeight: 800, color: C.white, lineHeight: 1.18, marginBottom: 10 }}>Do not leave money on the table.</h2>
                <p style={{ fontFamily: FB, fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.72, marginBottom: 22 }}>40,000+ Canadians get CRA updates every Tuesday. Free always.</p>
                <form onSubmit={e => { e.preventDefault(); if (email) setDone(true); }} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.ca" required
                    style={{ fontFamily: FB, fontSize: 15, padding: "13px 16px", borderRadius: 11, border: "1.5px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)", color: C.white, outline: "none", minHeight: 48 }} />
                  <button type="submit" style={{ fontFamily: FB, fontSize: 15, fontWeight: 700, background: "linear-gradient(135deg,#c97a0a,#e8960e)", color: C.forest, border: "none", borderRadius: 11, padding: "13px", minHeight: 48, cursor: "pointer" }}>Get My Free Weekly Update</button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

const POSTS = [
  { id:1, cat:"Benefits",            tag:"CRA",      color:"#1a3a2a", title:"The GST/HST Credit: Who Qualifies and How to Maximize It",           date:"Mar 18, 2026", read:"6 min"  },
  { id:2, cat:"Investing",           tag:"TFSA",     color:"#c97a0a", title:"TFSA vs RRSP in 2026: The Decision Tree Every Canadian Needs",         date:"Mar 11, 2026", read:"9 min"  },
  { id:3, cat:"Government Benefits", tag:"CCB",      color:"#2d5a42", title:"Canada Child Benefit 2026: New Amounts and Hidden Add-Ons",            date:"Mar 4, 2026",  read:"7 min"  },
  { id:4, cat:"Side Income",         tag:"Self-Emp", color:"#5a3e28", title:"Self-Employed in Canada? The 11 Deductions You Are Missing",           date:"Feb 25, 2026", read:"8 min"  },
  { id:5, cat:"Housing",             tag:"FHSA",     color:"#2a5a6a", title:"First Home Savings Account: The Complete 2026 Guide for BC Residents", date:"Feb 17, 2026", read:"10 min" },
];

function FeaturedCarousel(): JSX.Element {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const pausedRef = useRef(false);
  const posRef = useRef(0);
  const touchStartX = useRef(0);
  const touchStartPos = useRef(0);
  const isDragging = useRef(false);
  const all = [...POSTS, ...POSTS];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const step = () => {
      if (!pausedRef.current) {
        posRef.current += 0.5;
        const half = track.scrollWidth / 2;
        if (posRef.current >= half) posRef.current = 0;
        track.style.transform = "translateX(-" + posRef.current + "px)";
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    pausedRef.current = true;
    isDragging.current = true;
    touchStartX.current = e.touches[0].clientX;
    touchStartPos.current = posRef.current;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    const delta = touchStartX.current - e.touches[0].clientX;
    const half = trackRef.current.scrollWidth / 2;
    let newPos = touchStartPos.current + delta;
    if (newPos < 0) newPos = 0;
    if (newPos >= half) newPos = half - 1;
    posRef.current = newPos;
    trackRef.current.style.transform = "translateX(-" + newPos + "px)";
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    setTimeout(() => { pausedRef.current = false; }, 1000);
  };

  return (
    <div
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ overflow: "hidden", cursor: "grab", touchAction: "pan-y" }}>
      <div ref={trackRef} style={{ display: "flex", gap: 16, width: "max-content" }}>
        {all.map((post, i) => (
          <a key={i} href="/blog" style={{ width: "min(280px,72vw)", flexShrink: 0, background: C.white, borderRadius: 18, overflow: "hidden", textDecoration: "none", border: "1.5px solid #e8dcc8", boxShadow: "0 2px 14px rgba(26,58,42,0.06)", display: "flex", flexDirection: "column" }}>
            <div style={{ height: 100, background: "linear-gradient(150deg," + post.color + "," + post.color + "99)", display: "flex", alignItems: "flex-end", padding: "12px 14px" }}>
              <div style={{ background: "rgba(255,255,255,0.18)", borderRadius: 6, padding: "3px 10px" }}>
                <span style={{ fontFamily: FM, fontSize: 10, fontWeight: 700, color: C.white, letterSpacing: "0.1em" }}>{post.tag}</span>
              </div>
            </div>
            <div style={{ padding: "13px 14px 15px", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontFamily: FB, fontSize: 10, fontWeight: 700, color: post.color, letterSpacing: "0.12em", textTransform: "uppercase" }}>{post.cat}</span>
              <h3 style={{ fontFamily: FD, fontSize: 14, fontWeight: 700, color: C.charcoal, lineHeight: 1.35, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{post.title}</h3>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "auto", paddingTop: 10, borderTop: "1px solid #f2e8d8" }}>
                <span style={{ fontFamily: FB, fontSize: 11, color: C.mutedL }}>{post.date}</span>
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
    const trigger = () => { if (popupShown.current) return; popupShown.current = true; setShowPopup(true); };
    const onScroll = () => { const el = document.scrollingElement || document.documentElement; if (el.scrollTop / (el.scrollHeight - el.clientHeight) >= 0.38) trigger(); };
    window.addEventListener("scroll", onScroll, { passive: true });
    const timer = setTimeout(trigger, 5000);
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(timer); };
  }, []);

  const pillars = [
    { icon: "🏛", title: "Government Benefits", body: "CRA credits, provincial programs, every payment you are entitled to." },
    { icon: "📈", title: "Smart Investing",      body: "TFSA, RRSP, FHSA strategies for Canadian tax brackets." },
    { icon: "💼", title: "Side Income & Tax",    body: "Self-employment, gig work, deductions most Canadians never claim." },
    { icon: "🏠", title: "Housing & Homebuying", body: "First-time buyer grants, BC programs, mortgage math made simple." },
  ];

  const stats = [
    { n: <CountUpK target={40} />, l: "Monthly Readers"    },
    { n: "120+",                    l: "Articles Published" },
    { n: "100%",                    l: "Canadian Content"   },
    { n: "Free",                    l: "Always & Forever"   },
  ];

  return (
    <main style={{ background: C.cream }}>
      <AnimatePresence>{showPopup && <NewsletterPopup onClose={() => setShowPopup(false)} />}</AnimatePresence>

      {/* HERO */}
      <div style={{ background: "linear-gradient(170deg,#fdf8f0,#f2e8d8)", padding: "clamp(88px,12vw,110px) 26px clamp(36px,5vw,48px)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px,rgba(201,122,10,0.1) 1px,transparent 0)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: -50, top: "45%", transform: "translateY(-50%)", opacity: 0.04, pointerEvents: "none" }}><Maple size={360} color={C.forest} /></div>
        <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: C.amberPale, border: "1.5px solid #e8d5a0", borderRadius: 20, padding: "5px 14px", marginBottom: 20 }}>
            <Maple size={12} color={C.amber} />
            <span style={{ fontFamily: FM, fontSize: 10, fontWeight: 700, color: C.amber, letterSpacing: "0.14em", textTransform: "uppercase" }}>Canada Money Guide</span>
          </div>
          <h1 style={{ fontFamily: FD, fontSize: "clamp(30px,6vw,56px)", fontWeight: 900, color: C.forest, lineHeight: 1.06, marginBottom: 16, letterSpacing: "-0.01em" }}>
            Every Dollar<br />You Are Owed.<br />
            <em style={{ color: C.amber, fontStyle: "italic" }}>In Plain English.</em>
          </h1>
          <div style={{ width: 40, height: 3, background: C.amber, borderRadius: 2, marginBottom: 16 }} />
          <p style={{ fontFamily: FB, fontSize: "clamp(14px,2vw,16px)", color: C.muted, lineHeight: 1.78, marginBottom: 24, maxWidth: 520 }}>
            Government benefits, tax credits, and money guides for real Canadians. No jargon. No advisor fees. Always free.
          </p>

          {/* FIX 1: Single $3,400 stat card only */}
          <div style={{ marginBottom: 24, maxWidth: 320 }}>
            <div style={{ background: C.forest, borderRadius: 16, padding: "18px 20px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", right: -10, bottom: -10, opacity: 0.1 }}><Maple size={80} color={C.amberL} /></div>
              <div style={{ fontFamily: FM, fontSize: 9, color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Avg. missed per family / yr</div>
              <div style={{ fontFamily: FD, fontSize: "clamp(28px,5vw,38px)", fontWeight: 900, color: C.amberL, lineHeight: 1 }}>
                <CountUp target={3400} prefix="$" />
              </div>
              <div style={{ fontFamily: FB, fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 6 }}>in unclaimed Canadian benefits</div>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 11, marginBottom: 22, maxWidth: 480 }}>
            <a href="/blog" style={{ flex: "1 1 180px", fontFamily: FB, fontSize: 15, fontWeight: 700, color: C.white, background: C.forest, borderRadius: 13, padding: "15px", textDecoration: "none", textAlign: "center", boxShadow: "0 4px 18px rgba(26,58,42,0.28)" }}>Find What I Am Owed</a>
            <a href="/contact" style={{ flex: "1 1 160px", fontFamily: FB, fontSize: 14, fontWeight: 600, color: C.forest, border: "1.5px solid rgba(26,58,42,0.2)", borderRadius: 13, padding: "13px", textDecoration: "none", textAlign: "center" }}>Get Free Newsletter</a>
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {["No ads","CRA-sourced","Free forever"].map(t => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.amberL }} />
                <span style={{ fontFamily: FB, fontSize: 11, color: C.mutedL }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FIX 2: Green stats bar with 40K counting */}
      <div style={{ background: C.forest, padding: "28px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {stats.map(({ n, l }, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: FD, fontSize: "clamp(22px,3vw,28px)", fontWeight: 800, color: C.amberL }}>{n}</div>
              <div style={{ fontFamily: FB, fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 4, letterSpacing: "0.06em" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CAROUSEL */}
      <style>{`
        .carousel-mobile { display: block; }
        .carousel-desktop { display: none; }
        @media (min-width: 1024px) {
          .carousel-mobile { display: none; }
          .carousel-desktop { display: block; }
        }
      `}</style>
      <div style={{ background: C.creamD, padding: "clamp(44px,6vw,64px) 0" }}>
        <div style={{ maxWidth: 1020, margin: "0 auto", padding: "0 24px 20px" }}>
          <p style={{ fontFamily: FB, fontSize: 11, fontWeight: 700, color: C.amber, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>Featured Reading</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <h2 style={{ fontFamily: FD, fontSize: "clamp(22px,3.2vw,32px)", fontWeight: 700, color: C.forest, margin: 0 }}>Start Here</h2>
            <a href="/blog" style={{ fontFamily: FB, fontSize: 13, fontWeight: 600, color: C.forest, border: "1.5px solid rgba(26,58,42,0.2)", borderRadius: 9, padding: "8px 18px", textDecoration: "none" }}>View All</a>
          </div>
        </div>
        <div className="carousel-mobile" style={{ overflow: "hidden" }}>
          <FeaturedCarousel />
        </div>
        <div className="carousel-desktop" style={{ maxWidth: 1020, margin: "0 auto", paddingLeft: 24, overflow: "hidden" }}>
          <FeaturedCarousel />
        </div>
        <p style={{ fontFamily: FB, fontSize: 11, color: C.muted, textAlign: "center", marginTop: 16, letterSpacing: "0.06em" }}>Hover to pause · Swipe to browse</p>
      </div>

      {/* PILLARS */}
      <div style={{ background: C.cream, padding: "clamp(52px,7vw,80px) 24px" }}>
        <div style={{ maxWidth: 1020, margin: "0 auto" }}>
          <h2 style={{ fontFamily: FD, fontSize: "clamp(22px,3.5vw,34px)", fontWeight: 700, color: C.forest, textAlign: "center", marginBottom: 40 }}>Everything Canadian Finance, Nothing Else</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16 }}>
            {pillars.map(({ icon, title, body }) => (
              <a key={title} href="/blog" style={{ background: C.white, borderRadius: 16, padding: "24px 20px", border: "1.5px solid #e8dcc8", textDecoration: "none", display: "flex", flexDirection: "column", gap: 8, boxShadow: "0 2px 10px rgba(26,58,42,0.05)" }}>
                <span style={{ fontSize: 26 }}>{icon}</span>
                <h3 style={{ fontFamily: FD, fontSize: 15, fontWeight: 700, color: C.forest, margin: 0 }}>{title}</h3>
                <p style={{ fontFamily: FB, fontSize: 13, color: C.muted, lineHeight: 1.65, margin: 0 }}>{body}</p>
                <span style={{ fontFamily: FB, fontSize: 12, fontWeight: 700, color: C.amber, marginTop: 4 }}>Explore</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* FIX 3: Newsletter banner — full edge to edge, no rounded container */}
      <div style={{ background: "linear-gradient(135deg,#1a3a2a,#2d5a42)", padding: "clamp(44px,6vw,64px) 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg,#c97a0a,#e8960e)" }} />
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontFamily: FD, fontSize: "clamp(22px,3.5vw,38px)", fontWeight: 800, color: C.white, lineHeight: 1.15, marginBottom: 16 }}>
            The Canadian money newsletter<br />that actually explains things.
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginBottom: 28 }}>
            {["CRA deadlines you cannot miss","Benefit updates in plain English","One money move per week"].map(t => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.amberL, flexShrink: 0 }} />
                <span style={{ fontFamily: FB, fontSize: 14, color: "rgba(255,255,255,0.78)" }}>{t}</span>
              </div>
            ))}
          </div>
          <form onSubmit={e => e.preventDefault()} style={{ display: "flex", gap: 10, flexWrap: "wrap", maxWidth: 600 }}>
            <input type="email" placeholder="your@email.ca" style={{ flex: "1 1 220px", fontFamily: FB, fontSize: 15, padding: "14px 18px", borderRadius: 12, border: "1.5px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.1)", color: C.white, outline: "none", minHeight: 50 }} />
            <button type="submit" style={{ fontFamily: FB, fontSize: 15, fontWeight: 700, padding: "14px 28px", background: "linear-gradient(135deg,#c97a0a,#e8960e)", color: "#1a3a2a", border: "none", borderRadius: 12, minHeight: 50, cursor: "pointer", whiteSpace: "nowrap" }}>Subscribe Free</button>
          </form>
        </div>
      </div>

      <div className="bottom-nav-spacer" />
    </main>
  );
}
