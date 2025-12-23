import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@/generated/prisma/client";

// Define a type for the global object to persist the client across hot reloads
const globalForPrisma = global as unknown as {
  db: PrismaClient | undefined; // Use undefined for type safety
};

// Ensure DATABASE_URL is available
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
});

// Create the singleton PrismaClient instance
export const db = globalForPrisma.db || new PrismaClient({ adapter });

// Keep the client instance across hot reloads in development
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.db = db;
}
// const prisma = new PrismaClient({ adapter });

// export { prisma };
