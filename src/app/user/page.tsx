"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";
import { Footer } from "@/components/Footer";
import { usePosts } from "@/hooks/usePosts";
import { useUser } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";

const LoadingSpinner = () => (
  <div role="status" className="flex items-center justify-center min-h-[200px]">
    <svg
      aria-hidden="true"
      className="w-32 h-32 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
);

export default function UserPage() {
  const { user } = useUser();
  const { posts, isLoading } = usePosts();

  const [emojiPositions] = useState(() => {
    const emojis = ["📝", "✍️", "📖", "📰", "📚"];
    return Array.from({ length: 5 }).map((_, idx) => {
      return {
        emoji: emojis[idx % emojis.length],
        top: Math.random() * 80 + 10 + "vh",
        left: Math.random() * 80 + 10 + "vw",
        fontSize: `100px`,
        opacity: 0.1 + Math.random() * 0.2,
        rotate: `rotate(${Math.random() * 360}deg)`,
      };
    });
  });

  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          {emojiPositions.map((em, idx) => (
            <div
              key={idx}
              className="absolute"
              style={{
                top: em.top,
                left: em.left,
                fontSize: em.fontSize,
                opacity: em.opacity,
                transform: em.rotate,
              }}
            >
              <span role="img" aria-label="emoji" className="text-blue-300">
                {em.emoji}
              </span>
            </div>
          ))}
        </div>

        <nav className="relative top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white rounded-xl shadow-lg z-50 max-w-5xl w-[90%]">
          <div className="flex justify-between items-center p-4 text-base md:text-lg">
            <Link href="/" className="text-3xl font-bold">
              BlogNest
            </Link>
            <div className="flex gap-4 items-center">
              <Link href="/dashboard" className="border-2 p-1 bg-blue-600 text-white hover:bg-blue-800 transition-300 rounded-lg border-white ">
                Create Post
              </Link>
              <ModeToggle />
            </div>
          </div>
        </nav>

        <main className="flex-1 max-w-5xl mx-auto px-4 py-10 space-y-8 mt-16 animate-slide-up">
          <header>
            <h1 className="md:text-5xl text-3xl font-semibold mb-2 text-black dark:text-white">
              Hi {user?.firstName || "Blogger"} 👋
            </h1>
            <p className="text-muted-foreground dark:text-gray-400 text-xl">
              Welcome back! Here are your latest posts.
            </p>
          </header>

          <section>
            {isLoading ? (
              <LoadingSpinner />
            ) : posts.length === 0 ? (
              <p className="text-muted-foreground dark:text-gray-400">
                You have not written any posts yet.
              </p>
            ) : (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/posts/${post.slug}`}
                    className="block"
                  >
                    <div className="border border-gray-200 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md hover:shadow-blue-600 hover:scale-105 transition-all h-[300px] flex flex-col">
                      <img
                        src="https://cdn.shopify.com/s/files/1/0215/7612/files/IS_Portada_Blog_1_1.jpg?v=1749213314"
                        alt="Post Image"
                        className="w-full h-36 object-cover mb-4 rounded-lg"
                      />
                      <h2 className="text-lg font-semibold text-black dark:text-white flex-shrink-0">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground text-sm mt-2 dark:text-gray-400 flex-grow overflow-hidden">
                        {post.content
                          ? post.content.slice(0, 80) + "..."
                          : ""}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}


