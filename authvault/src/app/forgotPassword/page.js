"use client";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import React, { useRef, useState } from "react";
import Link from "next/link";

export default function ForgotPassword() {
  const emailRef = useRef(null);
  const [error, setError] = useState(null);
  const [mailSent, setMailSent] = useState(false);
  async function sendResetEmail(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const email = emailRef.current.value;
    try {
      await sendPasswordResetEmail(auth, email);
      emailRef.current.value = "";
      setMailSent(true);
      setError("");
    } catch (error) {
      setError("Failed to send password reset email. Please try again.");
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
          <h2 className="text-4xl font-bold mb-4">Forgot Password</h2>
          <p className="text-lg text-gray-600 max-w-xl mb-6">
            Please enter your email address to reset your password.
          </p>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form
          className="flex flex-col items-center space-y-4"
          onSubmit={sendResetEmail}
        >
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            required
            ref={emailRef}
            placeholder="Email Address"
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Send Reset Link
          </button>
          <p className="text-sm text-gray-600">
            {mailSent ? (
              <>
                Check your email for the reset link.{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </>
            ) : (
              "If you have an account, we will send you a password reset link."
            )}
          </p>
        </form>
      </section>
    </main>
  );
}
