"use client";
import React, { useRef, useState } from "react";

import { Eye } from "lucide-react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  function togglePasswordVisibility() {
    if (passwordRef && passwordRef.current) {
      passwordRef.current.type =
        passwordRef.current.type === "password" ? "text" : "password";
    }
  }
  async function handleLoginFormSubmit(event) {
    setError("");
    setLoading(true);
    event.preventDefault();
    const auth = getAuth();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("No user found with this email.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">
        <h1 className="text-xl font-bold">🔐 AuthVault</h1>
      </nav>
      <section className="flex flex-col items-center mt-20 px-4">
        <div className="flex flex-col items-center mt-20 px-4">
          <h2 className="text-4xl font-bold mb-4">Login</h2>
          <p className="text-lg text-gray-600 max-w-xl mb-6">
            Please enter your credentials to login.
          </p>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form
          className="flex flex-col items-center space-y-4"
          onSubmit={handleLoginFormSubmit}
        >
          <input
            ref={emailRef}
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded p-2 w-full max-w-xs "
            required
          />
          <div className="relative w-full max-w-xs">
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded p-2 w-full max-w-xs"
              required
            />
            <div
              className="absolute right-3 top-1/4  cursor-pointer text-gray-600"
              onClick={() => {
                togglePasswordVisibility();
              }}
            >
              <Eye size={16} />
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            Forgot your password?{" "}
            <Link
              href="/forgotPassword"
              className="text-blue-600 hover:underline"
            >
              Reset it here
            </Link>
          </p>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </section>
    </main>
  );
}
