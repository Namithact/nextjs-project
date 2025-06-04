"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/admin",
    });
  };

  return (
   <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
  <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-md space-y-6">
    <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

    <button
      onClick={() => signIn("google", { callbackUrl: "/admin" })}
      className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition duration-300"
    >
      Sign in with Google
    </button>

    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
      >
        Sign in
      </button>
    </form>
  </div>
</div>

  );
}
