import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/config";
import BlogCard from "@/components/BlogCard";
export default async function BlogList() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const session = await getServerSession(authOptions);
  const res = await fetch(`${baseUrl}/api/post`, {
    cache: "no-store",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const posts = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      <BlogCard initialPosts={posts} session={session} />
    </div>
  );
}
