"use client";
import { signOut } from "next-auth/react";
export default function Logout() {
  return (
   <div className="mb-8">
  <button
    onClick={() => signOut({ callbackUrl: "/login" })}
    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
  >
    Logout
  </button>
</div>
  )
}
