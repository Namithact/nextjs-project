"use client";
import Link from "next/link";
import removeMarkdown from "remove-markdown";
import { useState } from "react";
export default function BlogCard({ initialPosts, session }) {
  const [posts, setPosts] = useState(initialPosts);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  async function handleDelete(slug) {
    try {
      const response = await fetch(`${baseUrl}/api/post/${slug}`, {
        method: "DELETE",
        cache: "no-store",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the post");
      }

      const result = await response.json();
      setPosts((prevPosts) => prevPosts.filter((post) => post.slug !== slug));
      // You can update UI here after successful deletion
    } catch (error) {
      // Show error message in UI if needed
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex flex-col justify-between p-4 border rounded-md shadow-sm hover:shadow-md transition"
        >
          <div>
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-700 mb-2">
              {removeMarkdown(post.content).slice(0, 100)}...
            </p>
          </div>

          <div className="flex justify-between items-center mt-4">
            <Link
              href={`/blog/${post.slug}`}
              className="text-blue-600 hover:underline"
            >
              Read more
            </Link>
            {session && session.isAdmin && (
              <button
                onClick={() => handleDelete(post.slug)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
