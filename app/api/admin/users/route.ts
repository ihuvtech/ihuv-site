import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Get all users
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ ok: true, users });
  } catch (err: any) {
    console.error("Error fetching users:", err);
    return NextResponse.json(
      { error: "Failed to fetch users", details: err?.message },
      { status: 500 }
    );
  }
}

// Update user username
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId, username } = await req.json();

    if (!userId || !username) {
      return NextResponse.json({ error: "Missing userId or username" }, { status: 400 });
    }

    // Check if username already exists
    const existing = await prisma.user.findUnique({
      where: { username },
    });

    if (existing && existing.id !== userId) {
      return NextResponse.json({ error: "Username already taken" }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { username },
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
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
