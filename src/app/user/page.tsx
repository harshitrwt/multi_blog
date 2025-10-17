"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";
import { Footer } from "@/components/Footer";
import { useUser } from "@clerk/nextjs";
import { trpc } from "@/lib/trpcClient";
import { ThemeProvider } from "@/components/theme-provider";
import DeletePopup from "../../components/DeletePopup";
import { useRouter } from "next/navigation";

export default function UserPage() {
  const router = useRouter();
  const { user } = useUser();
  const [selectedCategory, setSelectedCategory] = useState<number | "all">("all");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const utils = trpc.useUtils();

  const { data: categories } = trpc.category.getAll.useQuery();
  const { data: posts, isLoading } = trpc.post.getAll.useQuery(
    selectedCategory === "all" ? {} : { categoryId: Number(selectedCategory) }
  );

  const deletePost = trpc.post.delete.useMutation({
    onSuccess: () => utils.post.getAll.invalidate(),
  });

  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <nav className="relative top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white rounded-xl shadow-lg z-50 max-w-5xl w-[90%]">
          <div className="flex justify-between items-center p-4">
            <Link href="/" className="text-3xl font-bold">BlogNest</Link>
            <div className="flex gap-4 items-center">
              <Link href="/dashboard" className="border-2 p-1 bg-blue-600 text-white hover:bg-blue-800 transition rounded-lg border-white">
                Create Post
              </Link>
              <ModeToggle />
            </div>
          </div>
        </nav>

        <main className="flex-1 max-w-5xl mx-auto px-4 py-10 space-y-8 mt-16">
          <header className="flex justify-between items-center">
            <div>
              <h1 className="md:text-5xl text-3xl font-semibold mb-2 text-black dark:text-white">
                Hi {user?.firstName || "Blogger"} 👋
              </h1>
              <p className="text-muted-foreground dark:text-gray-400 text-xl">
                Manage your published posts.
              </p>
            </div>
            <select
              className="border p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value === "all" ? "all" : Number(e.target.value))}
            >
              <option value="all">All Categories</option>
              {categories?.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </header>

          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">Published Posts</h2>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-10">
                {posts?.filter((p) => p.published).length ? (
                  posts
                    .filter((p) => p.published)
                    .map((post) => (
                      <div
                        key={post.id}
                        className="relative border border-gray-200 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md hover:shadow-blue-600 hover:scale-105 transition-all"
                      >
                        <button
                          onClick={() => setDeleteId(post.id)}
                          className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                        >
                          🗑️
                        </button>
                        <Link href={`/posts/${post.slug}`}>
                          <img
                            src="../cover.jpg"
                            alt="Post"
                            className="w-full h-36 object-cover mb-3 rounded-lg"
                          />
                          <h2 className="text-lg font-semibold text-black dark:text-white">{post.title}</h2>
                          <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                            {post.content.slice(0, 80)}...
                          </p>
                        </Link>
                      </div>
                    ))
                ) : (
                  <p className="text-gray-500">No published posts.</p>
                )}
              </div>

              <h2 className="text-2xl font-semibold mb-4 text-gray-500">Drafts</h2>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 opacity-70">
                {posts?.filter((p) => !p.published).length ? (
                  posts
                    .filter((p) => !p.published)
                    .map((post) => (
                      <div
                        key={post.id}
                        onClick={() => router.push(`/editor/${post.slug}`)}
                        className="cursor-pointer border border-gray-200 rounded-lg p-4 bg-gray-200 dark:bg-gray-700 hover:shadow-md hover:scale-105 transition-all"
                      >
                        <h2 className="text-lg font-semibold text-black dark:text-white">{post.title}</h2>
                        <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                          {post.content.slice(0, 80)}...
                        </p>
                      </div>
                    ))
                ) : (
                  <p className="text-gray-500">No drafts.</p>
                )}
              </div>
            </>
          )}

        </main>

        <Footer />

        {deleteId && (
          <DeletePopup
            onConfirm={() => {
              deletePost.mutate({ postId: deleteId });
              setDeleteId(null);
            }}
            onCancel={() => setDeleteId(null)}
          />
        )}
      </div>
    </ThemeProvider>
  );
}
