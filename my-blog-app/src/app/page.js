import Link from 'next/link';
export default function HomePage() {
  return (
    <main className="max-w-3xl mx-auto p-6 text-center">
      <h1 className="text-5xl font-bold mb-6">Welcome to My Blog</h1>

      <p className="text-lg text-gray-700 mb-4">
        Hi, I’m Namitha, a web developer passionate about building beautiful and
        efficient web applications. Here I share tutorials, tips, and thoughts about
        development and tech.
      </p>

      <p className="text-gray-600 mb-8">
        This blog is a personal space to document my learning journey and share knowledge
        with the community.
      </p>

      <Link
        href="/blog"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
      >
        Explore Blog Posts
      </Link>
    </main>
  );
}
