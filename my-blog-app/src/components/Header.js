"use client";

import Image from "next/image";
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
                    <li><a href="/" className="hover:underline">Home</a></li>
                    <li><a href="/about" className="hover:underline">About</a></li>
                    <li><a href="/contact" className="hover:underline">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>
    </>
  )
}
