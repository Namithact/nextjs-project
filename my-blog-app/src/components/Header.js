"use client";

import Image from "next/image";
import Link from "next/link";
export default function Header() {
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
                    <li><Link href="/login" className="hover:underline">Login</Link></li>
                </ul>
            </nav>
        </div>
    </header>
    </>
  )
}
