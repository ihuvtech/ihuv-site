import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const username = body?.username;
    const data = body?.data;

    if (!username) {
      return NextResponse.json({ error: "username missing" }, { status: 400 });
    }
    if (!data) {
      return NextResponse.json({ error: "data missing" }, { status: 400 });
    }

    const key = `portfolios/${username}.json`;

    const result = await put(key, JSON.stringify(data, null, 2), {
      access: "private",          // ✅ private store
      addRandomSuffix: false,     // ✅ deterministic key
      contentType: "application/json",
    });

    return NextResponse.json({
      ok: true,
      key: result.pathname,
      url: result.url,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to save portfolio", details: err?.message },
      { status: 500 }
    );
  }
}