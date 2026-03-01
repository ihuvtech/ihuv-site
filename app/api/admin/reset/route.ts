import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// WARNING: This endpoint deletes ALL user data
// Remove this file in production or add proper authentication
export async function POST(req: Request) {
  try {
    console.log("Deleting all portfolios...");
    const deletedPortfolios = await prisma.portfolio.deleteMany({});
    console.log(`Deleted ${deletedPortfolios.count} portfolios`);

    console.log("Deleting all sessions...");
    const deletedSessions = await prisma.session.deleteMany({});
    console.log(`Deleted ${deletedSessions.count} sessions`);

    console.log("Deleting all accounts...");
    const deletedAccounts = await prisma.account.deleteMany({});
    console.log(`Deleted ${deletedAccounts.count} accounts`);

    console.log("Deleting all users...");
    const deletedUsers = await prisma.user.deleteMany({});
    console.log(`Deleted ${deletedUsers.count} users`);

    return NextResponse.json({
      ok: true,
      message: "All user data deleted successfully",
      deleted: {
        portfolios: deletedPortfolios.count,
        sessions: deletedSessions.count,
        accounts: deletedAccounts.count,
        users: deletedUsers.count,
      },
    });
  } catch (err: any) {
    console.error("Error deleting data:", err);
    return NextResponse.json(
      { error: "Failed to delete data", details: err?.message },
      { status: 500 }
    );
  }
}
