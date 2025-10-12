"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <nav className="border-b bg-white dark:bg-black sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-xl font-bold">
          BlogApp
        </Link>
        <div className="flex gap-6 text-sm">
          <Link href="/">Home</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/about">About</Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}
