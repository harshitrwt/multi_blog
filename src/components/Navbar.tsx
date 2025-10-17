"use client";

import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ModeToggle";
import { useRouter } from "next/navigation";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="relative top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white rounded-xl shadow-lg z-50 max-w-5xl w-[90%]">
      <div className="flex justify-between items-center p-4 text-base md:text-lg">
        <span
          className="text-3xl font-bold cursor-pointer"
          onClick={() => router.push('/')} 
        >
          BlogNest
        </span>
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <div className="hidden md:flex gap-4 items-center">
          <span
            className="hover:underline cursor-pointer"
            onClick={() => router.push('/')} 
          >
            Home
          </span>
          <span
            className="hover:underline cursor-pointer"
            onClick={() => handleNavigation('/features')} 
          >
            Features
          </span>
          <span
            className="hover:underline cursor-pointer"
            onClick={() => handleNavigation('/about')} 
          >
            About
          </span>
          <span
            className="hover:underline cursor-pointer"
            onClick={() => router.push("/dashboard")} 
          >
            Dashboard
          </span>

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
          <span
            className="block py-2 text-white hover:underline cursor-pointer"
            onClick={() => { router.push('/'); setIsMenuOpen(false); }} 
          >
            Home
          </span>
          <span
            className="block py-2 text-white hover:underline cursor-pointer"
            onClick={() => { handleNavigation('/features'); }} 
          >
            Features
          </span>
          <span
            className="block py-2 text-white hover:underline cursor-pointer"
            onClick={() => { handleNavigation('/about'); }} 
          >
            About
          </span>
          <span
            className="block py-2 text-white hover:underline cursor-pointer"
            onClick={() => { router.push("/dashboard"); setIsMenuOpen(false); }} 
          >
            Dashboard
          </span>

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
