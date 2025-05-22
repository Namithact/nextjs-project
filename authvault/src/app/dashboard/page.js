"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Dashboard() {
  const [user, setUser] = useState(null);
    const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.displayName);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);
  function logoutUser() {
    auth.signOut()
      .then(() => {
        console.log("User signed out");
        router.push("/login");
        setUser(null);
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  }
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">
        <h1 className="text-xl font-bold">🔐 AuthVault</h1>
        {user ? <div className="space-x-4">
          <button onClick={logoutUser} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Logout
          </button>
        </div>: <div className="space-x-4">
          <Link href="/login" className="text-sm text-blue-600 hover:underline">Already Have an account? Login here</Link>
          <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">Register</Link>
        </div>}
        
      </nav>
      <section className="flex flex-col items-center mt-20 px-4">
        <div className="flex flex-col items-center mt-20 px-4">
          <h2 className="text-4xl font-bold mb-4">Dashboard</h2>
          <p className="text-lg text-gray-600 max-w-xl mb-6">
            Welcome, {user ? user : "Guest"}!
          </p>
          <p>This is your dashboard. You can manage your account here.</p>
        </div>
      </section>
    </main>
  );
}
