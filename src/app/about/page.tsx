import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-neutral-950">
      <Navbar />

      <header className="max-w-5xl mx-auto w-full px-6 py-12">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=7a5f5a7a3b4d7c9e7b4e6b8a7c2f2d2e"
            alt="About cover"
            className="w-full h-64 object-cover"
          />
        </div>

        <div className="mt-8 text-center">
          <h1 className="text-5xl font-extrabold text-blue-600 dark:text-blue-400">
            About
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
            BlogNest is a lightweight blogging platform demo built with Next.js,
            Drizzle ORM, TRPC, Clerk auth, and Tailwind CSS. Create posts, manage
            categories, drafts and publish to share your ideas.
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8 space-y-8">
        <section className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow">
          <h2 className="text-2xl font-semibold text-blue-600">Mission</h2>
          <p className="mt-3 text-gray-700 dark:text-gray-300">
            Provide a minimal, developer-friendly blogging app to demonstrate a
            full-stack setup with type-safety and modern patterns.
          </p>
        </section>

        <section className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow">
          <h2 className="text-2xl font-semibold text-blue-600">Tech stack</h2>
          <ul className="mt-3 list-disc ml-5 text-gray-700 dark:text-gray-300">
            <li>Next.js (App Router)</li>
            <li>TypeScript</li>
            <li>TRPC + tRPC React + TanStack Query</li>
            <li>Drizzle ORM + Postgres (Neon)</li>
            <li>Clerk for auth</li>
            <li>Zod for validation</li>
            <li>Zustand for small client state</li>
            <li>Tailwind CSS</li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
