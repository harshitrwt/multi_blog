"use client";

import Link from "next/link";
import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ModeToggle";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="relative top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white rounded-xl shadow-lg z-50 max-w-5xl w-[90%]">
      <div className="flex justify-between items-center p-4 text-base md:text-lg">
        <Link href="/" className="text-3xl font-bold">
          BlogNest
        </Link>
        
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <div className="hidden md:flex gap-4 items-center">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/categories" className="hover:underline">
            Categories
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>

          <ModeToggle />

          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm h-8 px-3 cursor-pointer hover:bg-purple-700 transition">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm h-8 px-3 cursor-pointer hover:bg-purple-700 transition">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>

      
      {isMenuOpen && (
        <div className="md:hidden bg-blue-600 p-4 absolute top-full left-0 w-full shadow-lg rounded-b-xl">
          <Link href="/" className="block py-2 text-white hover:underline">
            Home
          </Link>
          <Link href="/categories" className="block py-2 text-white hover:underline">
            Categories
          </Link>
          <Link href="/about" className="block py-2 text-white hover:underline">
            About
          </Link>
          <Link href="/dashboard" className="block py-2 text-white hover:underline">
            Dashboard
          </Link>

          <ModeToggle />

          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm h-8 px-3 cursor-pointer hover:bg-purple-700 transition">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm h-8 px-3 cursor-pointer hover:bg-purple-700 transition">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
        </div>
      )}
    </nav>
  );
}
