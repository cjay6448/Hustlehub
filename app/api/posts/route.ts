import { NextResponse } from "next/server";

const WP_API = "http://dimgrey-mule-669807.hostingersite.com/wp-json/wp/v2";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const url = category
      ? `${WP_API}/posts?per_page=24&_embed&categories=${category}`
      : `${WP_API}/posts?per_page=24&_embed`;

    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([]);
  }
}
