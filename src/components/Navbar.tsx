"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ModeToggle"; 

export function Navbar() {
  return (
    <nav className="relative top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white rounded-xl shadow-lg z-50 max-w-5xl w-[90%]">
      <div className="flex justify-between items-center p-4 text-base md:text-lg">
        <Link href="/" className="text-3xl font-bold">
          BlogNest
        </Link>
        <div className="flex gap-4 items-center">
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
    </nav>
  );
}
