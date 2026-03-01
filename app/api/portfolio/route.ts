import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Create or update a portfolio
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { portfolioId, portfolioName, portfolioSlug, data } = body;

    if (!portfolioName) {
      return NextResponse.json({ error: "Portfolio name is required" }, { status: 400 });
    }

    if (!portfolioSlug) {
      return NextResponse.json({ error: "Portfolio slug is required" }, { status: 400 });
    }

    if (!data) {
      return NextResponse.json({ error: "Portfolio data is required" }, { status: 400 });
    }

    // Validate slug format (lowercase, hyphens, no spaces)
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(portfolioSlug)) {
      return NextResponse.json({ 
        error: "Invalid slug format. Use lowercase letters, numbers, and hyphens only (e.g., 'tech-portfolio')" 
      }, { status: 400 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || !user.username) {
      return NextResponse.json({ error: "User not found or username not set" }, { status: 404 });
    }

    let portfolio;

    if (portfolioId) {
      // Update existing portfolio
      portfolio = await prisma.portfolio.update({
        where: { 
          id: portfolioId,
          userId: user.id, // Ensure user owns this portfolio
        },
        data: {
          name: portfolioName,
          slug: portfolioSlug,
          data,
          published: true,
          updatedAt: new Date(),
        },
      });
    } else {
      // Check if slug already exists for this user
      const existing = await prisma.portfolio.findFirst({
        where: {
          username: user.username,
          slug: portfolioSlug,
        },
      });

      if (existing) {
        return NextResponse.json({ 
          error: "A portfolio with this slug already exists. Please choose a different slug." 
        }, { status: 400 });
      }

      // Create new portfolio
      portfolio = await prisma.portfolio.create({
        data: {
          userId: user.id,
          username: user.username,
          slug: portfolioSlug,
          name: portfolioName,
          data,
          published: true,
        },
      });
    }

    return NextResponse.json({
      ok: true,
      portfolioId: portfolio.id,
      portfolioName: portfolio.name,
      portfolioSlug: portfolio.slug,
      username: portfolio.username,
      portfolioUrl: `/u/${portfolio.username}/${portfolio.slug}`,
    });
  } catch (err: any) {
    console.error("Portfolio save error:", err);
    
    // Provide more detailed error messages
    let errorMessage = "Failed to save portfolio";
    if (err.code === 'P2002') {
      errorMessage = "A portfolio with this slug already exists for your account";
    } else if (err.message) {
      errorMessage = err.message;
    }
    
    return NextResponse.json(
      { error: errorMessage, details: err?.message },
      { status: 500 }
    );
  }
}

// Get all portfolios for current user
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's portfolios
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        portfolios: {
          orderBy: { updatedAt: 'desc' },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      portfolios: user.portfolios,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to fetch portfolios", details: err?.message },
      { status: 500 }
    );
  }
}