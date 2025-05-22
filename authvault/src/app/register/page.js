"use client";
import { Eye } from "lucide-react";
import { useRef, useState } from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
export default function Register() {
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const emailRef = useRef(null);
  const fullNameRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function togglePasswordVisibility(ref) {
    if (ref && ref.current) {
      ref.current.type = ref.current.type === "password" ? "text" : "password";
    }
  }
  async function handleFormSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    const fullName = fullNameRef.current.value;
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: fullName });
      router.push("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">
        <h1 className="text-xl font-bold">🔐 AuthVault</h1>
      </nav>
      <section className="flex flex-col items-center  mt-20 px-4">
        <h2 className="text-4xl font-bold mb-4">Create an Account</h2>
        <p className="text-lg text-gray-600 max-w-xl mb-6">
          Join us to experience secure authentication with ease.
        </p>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleFormSubmit}
        >
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fullname"
            >
              Full Name
            </label>
            <input
              required
              ref={fullNameRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fullname"
              type="text"
              placeholder="Name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              required
              ref={emailRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email Address"
            />
          </div>
          <div className="mb-6 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>

            <input
              required
              ref={passwordRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
            />
            <div
              className="absolute right-3 top-1/2  cursor-pointer text-gray-600"
              onClick={() => {
                togglePasswordVisibility(passwordRef);
              }}
            >
              <Eye size={20} />
            </div>
          </div>
          <div className="mb-6 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmpassword"
            >
              Confirm Password
            </label>
            <input
              required
              ref={confirmPasswordRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmpassword"
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => {
                if (e.target.value !== passwordRef.current.value) {
                  e.target.setCustomValidity("Passwords do not match");
                } else {
                  e.target.setCustomValidity("");
                }
              }}
            />
            <div
              className="absolute right-3 top-1/2  cursor-pointer text-gray-600"
              onClick={() => {
                togglePasswordVisibility(confirmPasswordRef);
              }}
            >
              <Eye size={20} />
            </div>
          </div>
          <div>
            <button
              disabled={loading}
              className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline
                ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              type="submit"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
            <p className="text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Log In
              </a>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}
