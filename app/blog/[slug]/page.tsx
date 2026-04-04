import Link from "next/link";
import { notFound } from "next/navigation";

const WP_API = "http://dimgrey-mule-669807.hostingersite.com/wp-json/wp/v2";

export async function generateStaticParams() {
  try {
    const res = await fetch(`${WP_API}/posts?per_page=24&_fields=slug`, { next: { revalidate: 3600 } });
    const posts = await res.json();
    return posts.map((p: any) => ({ slug: p.slug }));
  } catch { return []; }
}

async function getPost(slug: string) {
  try {
    const res = await fetch(`${WP_API}/posts?slug=${slug}&_embed`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const posts = await res.json();
    return posts[0] || null;
  } catch { return null; }
}

function normalizeUrl(url: string): string {
  if (!url) return "";
  return url
    .replace(/https?:\/\/wp\.dimgrey-mule-669807\.hostingersite\.com/g, "https://dimgrey-mule-669807.hostingersite.com")
    .replace(/http:\/\/dimgrey-mule-669807\.hostingersite\.com/g, "https://dimgrey-mule-669807.hostingersite.com");
}

function normalizeContent(html: string, featuredUrl: string): string {
  if (!html) return "";
  let c = html
    .replace(/https?:\/\/wp\.dimgrey-mule-669807\.hostingersite\.com\/wp-content/g, "https://dimgrey-mule-669807.hostingersite.com/wp-content")
    .replace(/http:\/\/dimgrey-mule-669807\.hostingersite\.com\/wp-content/g, "https://dimgrey-mule-669807.hostingersite.com/wp-content")
    .replace(/https?:\/\/wp\.dimgrey-mule-669807\.hostingersite\.com\/(?!wp-content)([^/"#?]+)\//g, "https://hustlehub.ca/blog/$1/")
    .replace(/https?:\/\/dimgrey-mule-669807\.hostingersite\.com\/(?!wp-content)([^/"#?]+)\//g, "https://hustlehub.ca/blog/$1/")
    .replace(/https?:\/\/wp\.dimgrey-mule-669807\.hostingersite\.com\/[^"]*#/g, "#")
    .replace(/https?:\/\/dimgrey-mule-669807\.hostingersite\.com\/[^"]*#/g, "#")
    .replace(/<table/g, '<div class="table-scroll"><table')
    .replace(/<\/table>/g, "</table></div>");

  // Remove featured image from content so it only shows as thumbnail
  if (featuredUrl) {
    const filename = featuredUrl.split("/").pop()?.replace(/\.[^.]+$/, "") || "";
    if (filename) {
      const safe = filename.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      c = c.replace(new RegExp(`<figure[^>]*>[\\s\\S]*?<img[^>]*src="[^"]*${safe}[^"]*"[\\s\\S]*?<\\/figure>`, "gi"), "");
      c = c.replace(new RegExp(`<img[^>]*src="[^"]*${safe}[^"]*"[^>]*>`, "gi"), "");
    }
  }
  return c;
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const rawFeatured = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
  const category = post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Guide";
  const date = new Date(post.date).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
  const wordCount = (post.content?.rendered || "").replace(/<[^>]*>/g, "").split(/\s+/).length;
  const readTime = Math.max(1, Math.round(wordCount / 200));
  const content = normalizeContent(post.content?.rendered || "", rawFeatured);

  return (
    <main style={{ background: "#fdf8f0", minHeight: "100vh" }}>

      {/* HERO */}
      <div style={{ background: "linear-gradient(150deg,#1a3a2a,#2d5a42)", padding: "clamp(80px,8vw,100px) 24px 32px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg,#c97a0a,#e8960e)" }} />
        <div style={{ position: "absolute", right: -40, top: "50%", transform: "translateY(-50%)", opacity: 0.05, pointerEvents: "none" }}>
          <svg width={240} height={240} viewBox="0 0 100 100" fill="#e8960e">
            <path d="M50 5L57 30L75 20L65 40L90 38L72 55L80 80L60 68L50 90L40 68L20 80L28 55L10 38L35 40L25 20L43 30Z" />
          </svg>
        </div>
        <div style={{ maxWidth: 780, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
            <Link href="/" style={{ fontFamily: "Segoe UI, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "rgba(255,255,255,0.25)" }}>›</span>
            <Link href="/blog" style={{ fontFamily: "Segoe UI, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Blog</Link>
            <span style={{ color: "rgba(255,255,255,0.25)" }}>›</span>
            <span style={{ fontFamily: "Segoe UI, sans-serif", fontSize: 12, color: "#e8960e" }}>{category}</span>
          </div>
          {/* Category badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(232,150,14,0.18)", border: "1px solid rgba(232,150,14,0.35)", borderRadius: 20, padding: "4px 12px", marginBottom: 16 }}>
            <span style={{ fontFamily: "Courier New, monospace", fontSize: 10, fontWeight: 700, color: "#e8960e", letterSpacing: "0.12em", textTransform: "uppercase" }}>{category}</span>
          </div>
          {/* Title */}
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(22px,4vw,38px)", fontWeight: 900, color: "#ffffff", lineHeight: 1.15, marginBottom: 20 }}
            dangerouslySetInnerHTML={{ __html: post.title?.rendered || "" }} />
          {/* Author + meta */}
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#c97a0a", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid rgba(255,255,255,0.25)", flexShrink: 0 }}>
                <span style={{ fontFamily: "Georgia, serif", fontSize: 13, fontWeight: 700, color: "#1a3a2a" }}>CJ</span>
              </div>
              <div>
                <div style={{ fontFamily: "Segoe UI, sans-serif", fontSize: 13, fontWeight: 700, color: "#ffffff" }}>CJ · HustleHub.ca</div>
                <div style={{ fontFamily: "Segoe UI, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.45)" }}>Updated {date}</div>
              </div>
            </div>
            <div style={{ width: 1, height: 28, background: "rgba(255,255,255,0.15)" }} />
            <span style={{ fontFamily: "Courier New, monospace", fontSize: 11, color: "rgba(255,255,255,0.55)" }}>{readTime} min read</span>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "clamp(28px,5vw,44px) 24px clamp(48px,6vw,72px)" }}>
        <style>{`
          .wp-content h2 { font-family: Georgia, serif; font-size: clamp(19px,3vw,24px); font-weight: 700; color: #1a3a2a; margin: 36px 0 12px; line-height: 1.25; padding-bottom: 10px; border-bottom: 2px solid #f2e8d8; }
          .wp-content h3 { font-family: Georgia, serif; font-size: clamp(16px,2.5vw,20px); font-weight: 700; color: #1a3a2a; margin: 24px 0 10px; }
          .wp-content p { margin: 0 0 18px; }
          .wp-content a { color: #c97a0a; text-decoration: underline; }
          .wp-content a[href^="https://hustlehub.ca"] { color: #1a3a2a; font-weight: 600; text-decoration: none; border-bottom: 1.5px solid #e8d5a0; }
          .wp-content ul, .wp-content ol { padding-left: 24px; margin: 0 0 18px; }
          .wp-content li { margin-bottom: 8px; line-height: 1.65; }
          .wp-content img { max-width: 100%; border-radius: 12px; margin: 20px 0; height: auto; display: block; }
          .wp-content figure { margin: 24px 0; }
          .wp-content figcaption { font-family: Segoe UI, sans-serif; font-size: 12px; color: #b0a898; text-align: center; margin-top: 6px; }
          .wp-content blockquote { border-left: 4px solid #e8960e; padding: 14px 20px; margin: 28px 0; background: #fef4e0; border-radius: 0 10px 10px 0; font-style: italic; }
          .wp-content hr { border: none; border-top: 1px solid #e8dcc8; margin: 36px 0; }
          .wp-content strong { font-weight: 700; color: #252220; }
          .wp-content .ez-toc-v2_0_82_2 { display: none; }
          .wp-content .kk-star-ratings { display: none; }
          .wp-content .table-scroll { width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; margin: 24px 0; border-radius: 10px; border: 1px solid #e8dcc8; }
          .wp-content .table-scroll table { width: 100%; min-width: 480px; border-collapse: collapse; margin: 0; }
          .wp-content .table-scroll th { background: #1a3a2a; color: #fff; padding: 11px 16px; text-align: left; font-family: Segoe UI, sans-serif; font-size: 13px; font-weight: 600; white-space: nowrap; }
          .wp-content .table-scroll td { padding: 10px 16px; border-bottom: 1px solid #e8dcc8; font-size: 14px; vertical-align: top; }
          .wp-content .table-scroll tr:last-child td { border-bottom: none; }
          .wp-content .table-scroll tr:nth-child(even) td { background: #f2e8d8; }
        `}</style>

        <div className="wp-content"
          style={{ fontFamily: "Segoe UI, sans-serif", fontSize: "clamp(15px,2vw,17px)", color: "#252220", lineHeight: 1.88 }}
          dangerouslySetInnerHTML={{ __html: content }} />

        {/* Newsletter CTA */}
        <div style={{ background: "linear-gradient(135deg,#1a3a2a,#2d5a42)", borderRadius: 18, padding: "24px 26px", marginTop: 40, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ fontFamily: "Georgia, serif", fontSize: 17, fontWeight: 700, color: "#ffffff", margin: "0 0 4px" }}>Get CRA updates every Tuesday</p>
            <p style={{ fontFamily: "Segoe UI, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.6)", margin: 0 }}>Free newsletter · 40,000+ Canadians reading</p>
          </div>
          <Link href="/contact" style={{ fontFamily: "Segoe UI, sans-serif", fontSize: 13, fontWeight: 700, color: "#1a3a2a", background: "#e8960e", borderRadius: 10, padding: "11px 22px", textDecoration: "none", whiteSpace: "nowrap" }}>
            Subscribe Free
          </Link>
        </div>

        {/* Back link */}
        <div style={{ borderTop: "1px solid #e8dcc8", paddingTop: 28, marginTop: 40 }}>
          <Link href="/blog" style={{ fontFamily: "Segoe UI, sans-serif", fontSize: 14, fontWeight: 700, color: "#ffffff", background: "#1a3a2a", borderRadius: 12, padding: "13px 24px", textDecoration: "none", display: "inline-block" }}>
            ← Back to all guides
          </Link>
        </div>
      </div>

      <div className="bottom-nav-spacer" />
    </main>
  );
}
