// src/app/api/test-post/route.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const posts = await prisma.post.findMany();
    return Response.json(posts);
  } catch (err) {
    return new Response("❌ Query failed: " + err.message, { status: 500 });
  }
}
