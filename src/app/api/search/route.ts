import { NextRequest, NextResponse } from "next/server";

const UNSPLASH_URL = process.env.NEXT_PUBLIC_UNSPLASH_URL;
const ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

export async function GET(req: NextRequest) {
  if (!ACCESS_KEY || !UNSPLASH_URL) {
    return NextResponse.json({ error: "Missing API credentials" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "london";
  const page = searchParams.get("page") || "1";
  const perPage = 16;

  console.log("Fetching from Unsplash:", `${UNSPLASH_URL}?query=${query}&page=${page}&per_page=${perPage}`);
  console.log("Access Key:", ACCESS_KEY);

  try {
    const response = await fetch(
      `${UNSPLASH_URL}?query=${query}&page=${page}&per_page=${perPage}`,
      {
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Unsplash API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching from Unsplash:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
