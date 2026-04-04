"use client";
import { useState, useEffect } from "react";

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ").trim();
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-CA", {
    year: "numeric", month: "short", day: "numeric",
  });
}

function readTime(content: string) {
  const words = stripHtml(content).split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min`;
}

function normalizeUrl(url: string): string {
  if (!url) return "";
  return url
    .replace(/https?:\/\/wp\.dimgrey-mule-669807\.hostingersite\.com/g, "https://dimgrey-mule-669807.hostingersite.com")
    .replace(/http:\/\/dimgrey-mule-669807\.hostingersite\.com/g, "https://dimgrey-mule-669807.hostingersite.com");
}

const COLORS = ["#1a3a2a","#c97a0a","#2d5a42","#5a3e28","#2a5a6a","#3a2a5a"];

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch categories once on mount
  useEffect(() => {
    fetch("/api/categories")
      .then(r => r.json())
      .then(data => setCategories(Array.isArray(data) ? data.filter((c: any) => c.count > 0) : []))
      .catch(() => {});
  }, []);

  // Fetch posts whenever active category changes
  useEffect(() => {
    setLoading(true);
    const url = activeCategory
      ? `/api/posts?category=${activeCategory}`
      : `/api/posts`;
    fetch(url)
      .then(r => r.json())
      .then(data => { setPosts(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [activeCategory]);

  return (
    <main style={{ background: "#fdf8f0", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#1a3a2a,#2d5a42)", padding: "clamp(80px,10vw,120px) 24px clamp(40px,5vw,60px)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg,#c97a0a,#e8960e)" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(232,150,14,0.15)", border: "1px solid rgba(232,150,14,0.3)", borderRadius: 20, padding: "5px 14px", marginBottom: 20 }}>
            <svg width={12} height={12} viewBox="0 0 100 100" fill="#e8960e">
              <path d="M50 5L57 30L75 20L65 40L90 38L72 55L80 80L60 68L50 90L40 68L20 80L28 55L10 38L35 40L25 20L43 30Z" />
            </svg>
            <span style={{ fontFamily: "Courier New, monospace", fontSize: 10, fontWeight: 700, color: "#e8960e", letterSpacing: "0.14em", textTransform: "uppercase" }}>Canadian Finance Guides</span>
          </div>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(28px,5vw,48px)", fontWeight: 900, color: "#ffffff", lineHeight: 1.1, marginBottom: 16 }}>
            Every Dollar Guide<br />
            <em style={{ color: "#e8960e", fontStyle: "italic" }}>You Need.</em>
          </h1>
          <p style={{ fontFamily: "Segoe UI, sans-serif", fontSize: "clamp(14px,2vw,16px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.75, maxWidth: 520 }}>
            Plain-English guides to Canadian benefits, tax credits, investing, and more. No jargon. Always free.
          </p>
        </div>
      </div>

      {/* Category filter */}
      {categories.length > 0 && (
        <div style={{ background: "#f2e8d8", borderBottom: "1px solid #e8dcc8", padding: "14px 24px", overflowX: "auto" }}>
          <div style={{ display: "flex", gap: 8, maxWidth: 1020, margin: "0 auto", flexWrap: "wrap" }}>
            <button onClick={() => setActiveCategory(null)}
              style={{ fontFamily: "Segoe UI, sans-serif", fontSize: 12, fontWeight: 700, color: activeCategory === null ? "#ffffff" : "#1a3a2a", background: activeCategory === null ? "#1a3a2a" : "#ffffff", border: activeCategory === null ? "1.5px solid #1a3a2a" : "1.5px solid #e8dcc8", borderRadius: 20, padding: "6px 16px", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s" }}>
              All Posts
            </button>
            {categories.map((cat: any) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                style={{ fontFamily: "Segoe UI, sans-serif", fontSize: 12, fontWeight: 600, color: activeCategory === cat.id ? "#ffffff" : "#1a3a2a", background: activeCategory === cat.id ? "#1a3a2a" : "#ffffff", border: activeCategory === cat.id ? "1.5px solid #1a3a2a" : "1.5px solid #e8dcc8", borderRadius: 20, padding: "6px 16px", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s" }}>
                {cat.name} <span style={{ opacity: 0.55, fontWeight: 400 }}>({cat.count})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Posts grid */}
      <div style={{ maxWidth: 1020, margin: "0 auto", padding: "clamp(36px,5vw,56px) 24px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 24px" }}>
            <div style={{ width: 40, height: 40, border: "3px solid #e8dcc8", borderTop: "3px solid #1a3a2a", borderRadius: "50%", margin: "0 auto 16px", animation: "spin 1s linear infinite" }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ fontFamily: "Georgia, serif", fontSize: 16, color: "#7a7060" }}>Loading articles...</p>
          </div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 24px" }}>
            <p style={{ fontFamily: "Georgia, serif", fontSize: 18, color: "#1a3a2a", marginBottom: 16 }}>No articles in this category</p>
            <button onClick={() => setActiveCategory(null)} style={{ fontFamily: "Segoe UI, sans-serif", fontSize: 13, fontWeight: 600, color: "#ffffff", background: "#1a3a2a", border: "none", borderRadius: 10, padding: "10px 20px", cursor: "pointer" }}>View All Posts</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
            {posts.map((post: any, i: number) => {
              const color = COLORS[i % COLORS.length];
              const excerpt = stripHtml(post.excerpt?.rendered || "");
              const rawThumb = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
              const thumbnail = normalizeUrl(rawThumb);
              const category = post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Guide";
              return (
                <a key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "flex", flexDirection: "column", background: "#ffffff", borderRadius: 18, overflow: "hidden", border: "1.5px solid #e8dcc8", boxShadow: "0 2px 14px rgba(26,58,42,0.06)" }}>
                  {thumbnail ? (
                    <div style={{ height: 160, overflow: "hidden", background: "#f2e8d8" }}>
                      <img src={thumbnail} alt={stripHtml(post.title?.rendered || "")} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </div>
                  ) : (
                    <div style={{ height: 100, background: `linear-gradient(150deg,${color},${color}99)`, display: "flex", alignItems: "flex-end", padding: "12px 16px" }}>
                      <span style={{ fontFamily: "Courier New, monospace", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.9)", background: "rgba(255,255,255,0.18)", borderRadius: 6, padding: "3px 10px" }}>{category}</span>
                    </div>
                  )}
                  <div style={{ padding: "16px 18px 18px", flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                    <span style={{ fontFamily: "Segoe UI, sans-serif", fontSize: 10, fontWeight: 700, color, letterSpacing: "0.12em", textTransform: "uppercase" }}>{category}</span>
                    <h2 style={{ fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 700, color: "#252220", lineHeight: 1.35, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                      dangerouslySetInnerHTML={{ __html: post.title?.rendered || "" }} />
                    {excerpt && (
                      <p style={{ fontFamily: "Segoe UI, sans-serif", fontSize: 13, color: "#7a7060", lineHeight: 1.65, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {excerpt.slice(0, 120)}...
                      </p>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 12, borderTop: "1px solid #f2e8d8" }}>
                      <span style={{ fontFamily: "Segoe UI, sans-serif", fontSize: 11, color: "#b0a898" }}>{formatDate(post.date)}</span>
                      <span style={{ fontFamily: "Courier New, monospace", fontSize: 11, fontWeight: 700, color }}>{readTime(post.content?.rendered || "")} read</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>

      <div className="bottom-nav-spacer" />
    </main>
  );
}
