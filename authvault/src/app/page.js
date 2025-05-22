// app/page.tsx

import Link from 'next/link';

export default function Home() {
  return (
    <main className=" flex flex-col min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">
        <h1 className="text-xl font-bold">🔐 AuthVault</h1>
        <div className="space-x-4">
          <Link href="/login" className="text-sm text-blue-600 hover:underline">Login</Link>
          <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">Register</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col flex-grow items-center text-center mt-20 px-4">
        <h2 className="text-4xl font-bold mb-4">Secure Authentication Made Simple</h2>
        <p className="text-lg text-gray-600 max-w-xl mb-6">
          A modern authentication system built with Next.js App Router, JWT, and Tailwind CSS. Ideal for SaaS apps and dashboards.
        </p>
        <div className="flex gap-4">
          <Link href="/register" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
            Get Started
          </Link>
          <Link href="/login" className="border border-blue-600 text-blue-600 px-6 py-3 rounded hover:bg-blue-50">
            Log In
          </Link>
        </div>
      </section>

     
      <footer className="text-center text-sm text-gray-500 py-10">
        © 2025 AuthVault — Built by Namitha
      </footer>
    </main>
  );
}
