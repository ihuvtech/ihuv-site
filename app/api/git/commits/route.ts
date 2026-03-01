import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function GET() {
  try {
    const { stdout } = await execAsync(
      'git log -20 --format="%H|%an|%ae|%ar|%s"'
    );

    const commits = stdout
      .trim()
      .split("\n")
      .filter(Boolean)
      .map(line => {
        const [hash, author, email, date, ...messageParts] = line.split("|");
        return {
          hash,
          author,
          email,
          date,
          message: messageParts.join("|"),
        };
      });

    return NextResponse.json({ commits });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch commits", details: error.message },
      { status: 500 }
    );
  }
}
