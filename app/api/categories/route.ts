import { NextResponse } from "next/server";

const WP_API = "http://dimgrey-mule-669807.hostingersite.com/wp-json/wp/v2";

export async function GET() {
  try {
    const res = await fetch(`${WP_API}/categories?per_page=20`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([]);
  }
}
