import { NextResponse } from "next/server";

const WP_API = "http://dimgrey-mule-669807.hostingersite.com/wp-json/wp/v2";

export async function GET() {
  try {
    const res = await fetch(`${WP_API}/posts?per_page=24&_embed`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([]);
  }
}
