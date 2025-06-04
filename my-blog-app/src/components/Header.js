"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
export default function Header() {
      const { data: session, status } = useSession();
      console.log(status)
  return (
    <>
    <header className="bg-gray-800 text-white p-4">
        
        <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <Image
                    src="/logo.png"
                    alt="Blog Logo"
                    width={50}
                    height={50}
                />
            </div>
            <nav>
            
                <ul className="flex space-x-4">
                    <li><Link href="/" className="hover:underline">Home</Link></li>
                    <li> {status === "loading" ? null : status === "authenticated" ? (
                <Link href="/admin" className="hover:underline">
                  Admin
                </Link>
              ) : (
                <Link href="/login" className="hover:underline">
                  Login
                </Link>
              )}</li>
                </ul>
            </nav>
        </div>
    </header>
    </>
  )
}
