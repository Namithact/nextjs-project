// src/app/api/dbcheck/route.js

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    await prisma.$connect();
    return new Response("✅ Connected to DB!");
  } catch (error) {
    console.error("❌ DB connection failed:", error);
    return new Response("❌ DB connection failed", { status: 500 });
  }
}
