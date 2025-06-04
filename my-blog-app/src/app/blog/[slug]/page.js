import Link from 'next/link';
import ReactMarkdown from 'react-markdown'
export default async function BlogPage({ params }) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${baseUrl}/api/post/${slug}`, {
    cache: "no-store",
  });
  const posts = await response.json();
  if (!posts) return <div className="text-center mt-10">Loading...</div>;

  const formattedDate = new Date(posts.createdAt).toLocaleDateString();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href="/blog"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        &larr; Back to Blog
      </Link>

      <h1 className="text-4xl font-bold mb-2">{posts.title}</h1>
      <p className="text-gray-500 text-sm mb-6">Published on {formattedDate}</p>

      <div className="prose prose-lg max-w-none">
        <ReactMarkdown>{posts.content}</ReactMarkdown>
      </div>
    </div>
  );
}
