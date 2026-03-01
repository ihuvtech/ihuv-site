import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get("path");

    if (!path) {
      return NextResponse.json(
        { error: "Path parameter is required" },
        { status: 400 }
      );
    }

    const fullPath = join(process.cwd(), path);
    const content = await readFile(fullPath, "utf-8");

    return NextResponse.json({ content });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to read file", details: error.message },
      { status: 500 }
    );
  }
}
