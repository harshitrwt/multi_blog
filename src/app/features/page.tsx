import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const features = [
  {
    title: "Simple Markdown Editor",
    text: "Write posts in Markdown. Preview and edit with a responsive editor. Saves drafts and publishes when ready.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3i1vydah5ROmi5l_HegTtJNnX8Jh9NDFsrQ&s",
  },
  {
    title: "Category Management",
    text: "Create categories, assign multiple categories to posts and filter posts by category.",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=8f2a5f2b5d4d6a1a7c7f1c2d1a4b3e9c",
  },
  {
    title: "Drafts and Publishing",
    text: "Save drafts, iterate offline and publish when ready. Drafts are visible only to the author in the dashboard.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3HdmsWXbedyTN82HnURO92HXdvCsuUyNlWA&s",
  },
  {
    title: "Type-safe API with TRPC",
    text: "End-to-end type-safety using TRPC and Zod ensures safe contracts between client and server.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg_9dABQyyCDggKNfCrTTDI8JLHIKN-AXD2A&s",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-neutral-950">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16 mt-20">
        <header className="text-center">
          <h1 className="text-5xl font-extrabold text-blue-600 mb-10">Features</h1>
          
        </header>

        {features.map((f, i) => {
          const reverse = i % 2 === 1;
          return (
            <section
              key={i}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                reverse ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="md:w-1/2">
                <img
                  src={f.img}
                  alt={f.title}
                  className="w-full h-64 object-cover rounded-2xl shadow-lg shadow-white hover:shadow-blue-600 dark:shadow-white"
                />
              </div>

              <div className="md:w-1/2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-8 bg-blue-600 text-white text-center rounded-full flex items-center justify-center font-semibold">
                    {i + 1}
                  </div>
                  <h2 className="text-2xl font-semibold text-blue-600">{f.title}</h2>
                </div>
                <p className="mt-3 text-gray-700 dark:text-gray-300">{f.text}</p>
              </div>
            </section>
          );
        })}
      </main>

      <Footer />
    </div>
  );
}
