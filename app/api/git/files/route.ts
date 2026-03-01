import { NextResponse } from "next/server";
import { readdir, stat } from "fs/promises";
import { join } from "path";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get("path") || "";
    
    const fullPath = join(process.cwd(), path);
    const entries = await readdir(fullPath, { withFileTypes: true });

    // Filter out common ignored files/folders
    const ignored = [
      "node_modules",
      ".next",
      ".git",
      ".vercel",
      "build",
      "dist",
      ".DS_Store",
    ];

    const files = await Promise.all(
      entries
        .filter(entry => !ignored.includes(entry.name) && !entry.name.startsWith("."))
        .map(async entry => {
          const entryPath = path ? `${path}/${entry.name}` : entry.name;
          return {
            name: entry.name,
            type: entry.isDirectory() ? "directory" : "file",
            path: entryPath,
          };
        })
    );

    // Sort: directories first, then files, both alphabetically
    files.sort((a, b) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      }
      return a.type === "directory" ? -1 : 1;
    });

    return NextResponse.json({ files });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch files", details: error.message },
      { status: 500 }
    );
  }
}
