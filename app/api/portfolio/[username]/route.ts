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

    const portfolios = await prisma.portfolio.findMany({
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

    if (!portfolios || portfolios.length === 0) {
      return NextResponse.json({ error: "No portfolios found" }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      portfolios: portfolios.map(p => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        username: p.username,
        data: p.data,
        published: p.published,
      })),
      user: portfolios[0].user,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Unable to read portfolio", details: err?.message },
      { status: 500 }
    );
  }
}
