import { NextResponse, type NextRequest } from "next/server";
import { get } from "@vercel/blob";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ username: string }> } // ✅ params is Promise
) {
  try {
    const { username } = await params;

    if (!username) {
      return NextResponse.json({ error: "username missing" }, { status: 400 });
    }

    const key = `portfolios/${username}.json`;

    const result = await get(key, { access: "private" }); // ✅ required

    if (!result) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    // ✅ Read JSON from the stream (private blobs cannot be fetched via blob.url directly)
    const text = await new Response(result.stream).text();
    const data = JSON.parse(text);

    return NextResponse.json({ ok: true, username, data });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Unable to read portfolio", details: err?.message },
      { status: 500 }
    );
  }
}