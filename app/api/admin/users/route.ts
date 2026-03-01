import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Get all users
export async function GET(req: Request) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        image: true,
        createdAt: true,
        portfolios: {
          orderBy: { updatedAt: 'desc' },
          take: 1,
          select: {
            data: true,
          },
        },
        _count: {
          select: {
            portfolios: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Extract portfolio image from latest portfolio for each user
    const usersWithPortfolioImages = users.map(user => {
      let portfolioImage = null;
      
      if (user.portfolios && user.portfolios.length > 0) {
        const portfolioData = user.portfolios[0].data as any;
        
        // Check for profilePhoto (this is where images are actually stored)
        if (portfolioData?.profilePhoto) {
          portfolioImage = portfolioData.profilePhoto;
        }
        
        // Fallback to project images if no profile photo
        if (!portfolioImage && portfolioData?.projects && Array.isArray(portfolioData.projects)) {
          const projectWithImage = portfolioData.projects.find((proj: any) => proj.image);
          if (projectWithImage?.image) {
            portfolioImage = projectWithImage.image;
          }
        }
      }
      
      // Use portfolio image if available, otherwise use user profile image
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        image: portfolioImage || user.image,
        createdAt: user.createdAt,
        _count: user._count,
      };
    });

    return NextResponse.json({ ok: true, users: usersWithPortfolioImages });
  } catch (err: any) {
    console.error("Error fetching users:", err);
    return NextResponse.json(
      { error: "Failed to fetch users", details: err?.message },
      { status: 500 }
    );
  }
}

// Update user
export async function PATCH(req: Request) {
  try {
    const { userId, name, email, username, image } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    // Check if email or username already exists (if being changed)
    if (email) {
      const existingEmail = await prisma.user.findUnique({
        where: { email },
      });
      if (existingEmail && existingEmail.id !== userId) {
        return NextResponse.json({ error: "Email already taken" }, { status: 400 });
      }
    }

    if (username) {
      const existingUsername = await prisma.user.findUnique({
        where: { username },
      });
      if (existingUsername && existingUsername.id !== userId) {
        return NextResponse.json({ error: "Username already taken" }, { status: 400 });
      }
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name: name || null,
        email,
        username: username || null,
        image: image || null,
      },
    });

    return NextResponse.json({ ok: true, user });
  } catch (err: any) {
    console.error("Error updating user:", err);
    return NextResponse.json(
      { error: "Failed to update user", details: err?.message },
      { status: 500 }
    );
  }
}

// Delete user
export async function DELETE(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    // Delete user (cascades to portfolios, sessions, accounts)
    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Error deleting user:", err);
    return NextResponse.json(
      { error: "Failed to delete user", details: err?.message },
      { status: 500 }
    );
  }
}
