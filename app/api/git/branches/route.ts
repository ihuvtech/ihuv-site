import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function GET() {
  try {
    // Get all branches
    const { stdout: branchOutput } = await execAsync("git branch -a");
    const branches = branchOutput
      .split("\n")
      .filter(Boolean)
      .map(b => b.trim().replace(/^\*\s+/, "").replace(/^remotes\/origin\//, ""))
      .filter(b => !b.includes("HEAD ->"))
      .filter((v, i, a) => a.indexOf(v) === i); // unique

    // Get current branch
    const { stdout: currentOutput } = await execAsync("git branch --show-current");
    const current = currentOutput.trim();

    return NextResponse.json({
      branches,
      current,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch branches", details: error.message },
      { status: 500 }
    );
  }
}
