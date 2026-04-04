import Link from "next/link";
import { notFound } from "next/navigation";

const WP_API = "http://dimgrey-mule-669807.hostingersite.com/wp-json/wp/v2";

async function getPost(slug: string) {
  try {
    const res = await fetch(`${WP_API}/posts?slug=${slug}&_embed`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const posts = await res.json();
    return posts[0] || null;
  } catch {
    return null;
  }
}

function normalizeContent(html: string): string {
  if (!html) return "";
  return html
    .replace(/http:\/\/wp\.dimgrey-mule-669807\.hostingersite\.com\/wp-content/g, "https://dimgrey-mule-669807.hostingersite.com/wp-content")
    .replace(/http:\/\/dimgrey-mule-669807\.hostingersite\.com\/wp-content/g, "https://dimgrey-mule-669807.hostingersite.com/wp-content")
    .replace(/https?:\/\/wp\.dimgrey-mule-669807\.hostingersite\.com\/([^/"#?]+)\//g, "https://hustlehub.ca/blog/$1/")
    .replace(/https?:\/\/dimgrey-mule-669807\.hostingersite\.com\/([^/"#?]+)\//g, "https://hustlehub.ca/blog/$1/")
    .replace(/https?:\/\/wp\.dimgrey-mule-669807\.hostingersite\.com\/([^"]+)#/g, "#")
    .replace(/https?:\/\/dimgrey-mule-669807\.hostingersite\.com\/([^"]+)#/g, "#")
    // Wrap every <table> in a scrollable div
    .replace(/<table/g, '<div class="table-scroll"><table')
    .replace(/<\/table>/g, "</table></div>");
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const rawThumbnail = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
  const thumbnail = normalizeContent(rawThumbnail);
  const category = post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Guide";
  const date = new Date(post.date).toLocaleDateString("en-CA", {
    year: "numeric", month: "long", day: "numeric",
  });
  const content = normalizeContent(post.content?.rendered || "");

  return (
    <main style={{ background: "#fdf8f0", minHeight: "100vh" }}>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "clamp(80px,8vw,100px) 24px 0" }}>
        <Link href="/blog" style={{ fontFamily: "Segoe UI, sans-serif", fontSize: 13, fontWeight: 600, color: "#1a3a2a", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 24, opacity: 0.7 }}>
          ← Back to all guides
        </Link>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px 32px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#fef4e0", border: "1.5px solid #e8d5a0", borderRadius: 20, padding: "4px 12px", marginBottom: 16 }}>
          <span style={{ fontFamily: "Courier New, monospace", fontSize: 10, fontWeight: 700, color: "#c97a0a", letterSpacing: "0.12em", textTransform: "uppercase" }}>{category}</span>
        </div>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(24px,4vw,40px)", fontWeight: 900, color: "#1a3a2a", lineHeight: 1.15, marginBottom: 16 }}
          dangerouslySetInnerHTML={{ __html: post.title?.rendered || "" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <span style={{ fontFamily: "Segoe UI, sans-serif", fontSize: 13, color: "#b0a898" }}>{date}</span>
          <span style={{ color: "#e8dcc8" }}>·</span>
          <span style={{ fontFamily: "Courier New, monospace", fontSize: 12, fontWeight: 700, color: "#c97a0a" }}>HustleHub.ca</span>
        </div>
        <div style={{ height: 3, width: 40, background: "#e8960e", borderRadius: 2, marginBottom: 32 }} />
      </div>

      {thumbnail && (
        <div style={{ maxWidth: 780, margin: "0 auto 32px", padding: "0 24px" }}>
          <img src={thumbnail} alt={post.title?.rendered || ""} style={{ width: "100%", borderRadius: 16, display: "block" }} />
        </div>
      )}

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px clamp(48px,6vw,72px)" }}>
        <style>{`
          .wp-content h2 { font-family: Georgia, serif; font-size: clamp(20px,3vw,26px); font-weight: 700; color: #1a3a2a; margin: 32px 0 12px; line-height: 1.25; }
          .wp-content h3 { font-family: Georgia, serif; font-size: clamp(17px,2.5vw,22px); font-weight: 700; color: #1a3a2a; margin: 24px 0 10px; }
          .wp-content p { margin: 0 0 18px; }
          .wp-content a { color: #c97a0a; text-decoration: underline; }
          .wp-content a[href^="https://hustlehub.ca"] { color: #1a3a2a; font-weight: 600; }
          .wp-content ul, .wp-content ol { padding-left: 24px; margin: 0 0 18px; }
          .wp-content li { margin-bottom: 8px; }
          .wp-content img { max-width: 100%; border-radius: 12px; margin: 16px 0; height: auto; }
          .wp-content figure { margin: 24px 0; }
          .wp-content blockquote { border-left: 4px solid #e8960e; padding: 12px 20px; margin: 24px 0; background: #fef4e0; border-radius: 0 8px 8px 0; }
          .wp-content hr { border: none; border-top: 1px solid #e8dcc8; margin: 32px 0; }
          .wp-content .ez-toc-v2_0_82_2 { display: none; }
          .wp-content .kk-star-ratings { display: none; }

          /* Scrollable table wrapper */
          .wp-content .table-scroll {
            width: 100%;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            margin: 24px 0;
            border-radius: 10px;
            border: 1px solid #e8dcc8;
          }
          .wp-content .table-scroll table {
            width: 100%;
            min-width: 480px;
            border-collapse: collapse;
            margin: 0;
          }
          .wp-content .table-scroll th {
            background: #1a3a2a;
            color: #ffffff;
            padding: 11px 16px;
            text-align: left;
            font-family: Segoe UI, sans-serif;
            font-size: 13px;
            font-weight: 600;
            white-space: nowrap;
          }
          .wp-content .table-scroll td {
            padding: 10px 16px;
            border-bottom: 1px solid #e8dcc8;
            font-size: 14px;
            vertical-align: top;
          }
          .wp-content .table-scroll tr:last-child td {
            border-bottom: none;
          }
          .wp-content .table-scroll tr:nth-child(even) td {
            background: #f2e8d8;
          }
        `}</style>
        <div className="wp-content"
          style={{ fontFamily: "Segoe UI, sans-serif", fontSize: "clamp(15px,2vw,17px)", color: "#252220", lineHeight: 1.85 }}
          dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px 48px" }}>
        <div style={{ borderTop: "1px solid #e8dcc8", paddingTop: 32 }}>
          <Link href="/blog" style={{ fontFamily: "Segoe UI, sans-serif", fontSize: 14, fontWeight: 700, color: "#ffffff", background: "#1a3a2a", borderRadius: 12, padding: "13px 24px", textDecoration: "none", display: "inline-block" }}>
            ← Back to all guides
          </Link>
        </div>
      </div>

      <div className="bottom-nav-spacer" />
    </main>
  );
}
