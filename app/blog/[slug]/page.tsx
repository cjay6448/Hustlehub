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

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const thumbnail = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const category = post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Guide";
  const date = new Date(post.date).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });

  return (
    <main style={{ background: "#fdf8f0", minHeight: "100vh" }}>

      {/* Back link */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "clamp(80px,8vw,100px) 24px 0" }}>
        <Link href="/blog" style={{ fontFamily: "Segoe UI, sans-serif", fontSize: 13, fontWeight: 600, color: "#1a3a2a", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 24, opacity: 0.7 }}>
          ← Back to all guides
        </Link>
      </div>

      {/* Header */}
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

      {/* Featured image */}
      {thumbnail && (
        <div style={{ maxWidth: 780, margin: "0 auto 32px", padding: "0 24px" }}>
          <img src={thumbnail} alt={post.title?.rendered || ""} style={{ width: "100%", borderRadius: 16, display: "block" }} />
        </div>
      )}

      {/* Content */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px clamp(48px,6vw,72px)" }}>
        <div className="wp-content"
          style={{ fontFamily: "Segoe UI, sans-serif", fontSize: "clamp(15px,2vw,17px)", color: "#252220", lineHeight: 1.85 }}
          dangerouslySetInnerHTML={{ __html: post.content?.rendered || "" }} />
      </div>

      {/* Back to blog */}
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
