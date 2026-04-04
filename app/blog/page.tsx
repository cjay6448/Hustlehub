"use server";
import Link from "next/link";

const WP_API = "http://dimgrey-mule-669807.hostingersite.com/wp-json/wp/v2";

async function getPosts() {
  try {
    const res = await fetch(`${WP_API}/posts?per_page=12&_embed`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function getCategories() {
  try {
    const res = await fetch(`${WP_API}/categories?per_page=20`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

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

// Normalize image URL: force https, replace wp. subdomain with base domain
function normalizeImageUrl(url: string): string {
  if (!url) return "";
  return url
    .replace("http://wp.dimgrey-mule-669807.hostingersite.com", "https://dimgrey-mule-669807.hostingersite.com")
    .replace("http://dimgrey-mule-669807.hostingersite.com", "https://dimgrey-mule-669807.hostingersite.com");
}

const COLORS = ["#1a3a2a","#c97a0a","#2d5a42","#5a3e28","#2a5a6a","#3a2a5a"];

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);

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

      {/* Categories */}
      {categories.length > 0 && (
        <div style={{ background: "#f2e8d8", borderBottom: "1px solid #e8dcc8", padding: "14px 24px", overflowX: "auto" }}>
          <div style={{ display: "flex", gap: 8, maxWidth: 1020, margin: "0 auto", flexWrap: "wrap" }}>
            {categories.filter((c: any) => c.count > 0).map((cat: any) => (
              <span key={cat.id} style={{ fontFamily: "Segoe UI, sans-serif", fontSize: 12, fontWeight: 600, color: "#1a3a2a", background: "#ffffff", border: "1.5px solid #e8dcc8", borderRadius: 20, padding: "5px 14px", whiteSpace: "nowrap", cursor: "pointer" }}>
                {cat.name} <span style={{ color: "#b0a898", fontWeight: 400 }}>({cat.count})</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Posts grid */}
      <div style={{ maxWidth: 1020, margin: "0 auto", padding: "clamp(36px,5vw,56px) 24px" }}>
        {posts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 24px" }}>
            <p style={{ fontFamily: "Georgia, serif", fontSize: 20, color: "#1a3a2a", marginBottom: 8 }}>Articles loading...</p>
            <p style={{ fontFamily: "Segoe UI, sans-serif", fontSize: 14, color: "#7a7060" }}>Check back shortly.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
            {posts.map((post: any, i: number) => {
              const color = COLORS[i % COLORS.length];
              const excerpt = stripHtml(post.excerpt?.rendered || "");
              const rawThumbnail = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
              const thumbnail = normalizeImageUrl(rawThumbnail || "");
              const category = post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Guide";
              return (
                <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "flex", flexDirection: "column", background: "#ffffff", borderRadius: 18, overflow: "hidden", border: "1.5px solid #e8dcc8", boxShadow: "0 2px 14px rgba(26,58,42,0.06)" }}>
                  {thumbnail ? (
                    <div style={{ height: 160, overflow: "hidden", background: "#f2e8d8" }}>
                      <img
                        src={thumbnail}
                        alt={stripHtml(post.title?.rendered || "")}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    </div>
                  ) : (
                    <div style={{ height: 100, background: `linear-gradient(150deg,${color},${color}99)`, display: "flex", alignItems: "flex-end", padding: "12px 16px" }}>
                      <span style={{ fontFamily: "Courier New, monospace", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.9)", background: "rgba(255,255,255,0.18)", borderRadius: 6, padding: "3px 10px", letterSpacing: "0.08em" }}>{category}</span>
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
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <div className="bottom-nav-spacer" />
    </main>
  );
}
