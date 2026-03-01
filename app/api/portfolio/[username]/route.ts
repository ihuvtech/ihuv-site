import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;

    if (!username) {
      return NextResponse.json({ error: "username missing" }, { status: 400 });
    }

    const portfolio = await prisma.portfolio.findUnique({
      where: { username },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      username: portfolio.username,
      data: portfolio.data,
      published: portfolio.published,
      user: portfolio.user,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Unable to read portfolio", details: err?.message },
      { status: 500 }
    );
  }
}