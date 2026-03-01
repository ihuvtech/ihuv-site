import "dotenv/config";
import { Pool } from "pg";

const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("POSTGRES_URL or DATABASE_URL environment variable is not set");
}

const pool = new Pool({ connectionString });

async function clearUsers() {
  const client = await pool.connect();
  
  try {
    console.log("Deleting all portfolios...");
    const portfolios = await client.query("DELETE FROM \"Portfolio\"");
    console.log(`Deleted ${portfolios.rowCount} portfolios`);

    console.log("Deleting all sessions...");
    const sessions = await client.query("DELETE FROM \"Session\"");
    console.log(`Deleted ${sessions.rowCount} sessions`);

    console.log("Deleting all accounts...");
    const accounts = await client.query("DELETE FROM \"Account\"");
    console.log(`Deleted ${accounts.rowCount} accounts`);

    console.log("Deleting all users...");
    const users = await client.query("DELETE FROM \"User\"");
    console.log(`Deleted ${users.rowCount} users`);

    console.log("\n✅ All user data cleared successfully!");
  } catch (error) {
    console.error("Error clearing user data:", error);
  } finally {
    client.release();
    await pool.end();
  }
}

clearUsers();
