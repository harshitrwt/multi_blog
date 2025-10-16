"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PostCard } from "@/components/PostCard";
import { trpc } from "@/lib/trpcClient";
import { useUIStore } from "../store/uiStore";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const username = isLoaded ? user?.firstName || user?.username || "Blogger" : "Blogger";

  // editor local state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | "">("");

  // UI store
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const openSidebar = useUIStore((s) => s.openSidebar);
  const closeSidebar = useUIStore((s) => s.closeSidebar);
  const showToast = useUIStore((s) => s.showToast);
  const hideToast = useUIStore((s) => s.hideToast);
  const toast = useUIStore((s) => s.toast);

  // TRPC queries + mutations
  const { data: categories = [] } = trpc.category.getAll.useQuery();
  const { data: posts = [] } = trpc.post.getAll.useQuery();
  const utils = trpc.useContext();

  const createCategory = trpc.category.create.useMutation({
    onSuccess: () => {
      utils.category.getAll.invalidate();
      showToast("Category created");
      setTimeout(hideToast, 2500);
    },
  });

  const createPost = trpc.post.create.useMutation({
    onSuccess: (created) => {
      utils.post.getAll.invalidate();
      showToast("Post created");
      setTitle("");
      setContent("");
      setSlug("");
      setCoverImage("");
      setSelectedCategory("");
      setTimeout(() => {
        hideToast();
        router.push("/user");
      }, 1200);
    },
  });

  
  const handleCreateCategory = (name: string) => {
    const s = name.trim().toLowerCase().replace(/\s+/g, "-");
    createCategory.mutate({ name, slug: s });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-neutral-950">
      <Navbar />

      <header className="px-6 py-6 mt-16 max-w-6xl mx-auto w-full flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-blue-600 flex items-center gap-3">
            
            Hi {username} <span className="text-4xl">👋</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create, edit, and publish your posts here.
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-6 py-8 w-full grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-8">
        
        <section className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-blue-600">New Post</h2>
            
          </div>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            className="w-full mb-4 p-3 rounded-lg border focus:ring-2 focus:ring-blue-400"
          />

          <div className="mb-3 grid grid-cols-1 lg:grid-cols-3 gap-3">
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Slug (url-friendly)"
              className="p-2 rounded-lg border col-span-2"
            />
            <input
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="Cover image URL (optional)"
              className="p-2 rounded-lg border"
            />
          </div>

          <div className="mb-3 flex items-center gap-3">
            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(e.target.value ? Number(e.target.value) : "")
              }
              className="p-2 rounded-lg border"
            >
              <option value="">Select category</option>
              {categories.map((c: any) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                const name = prompt("New category name")?.trim();
                if (name) handleCreateCategory(name);
              }}
              className="px-3 py-2 rounded-lg bg-sky-600 text-white"
            >
              + Create category
            </button>
          </div>

          <div className="mb-4">
            <div className="rounded-lg overflow-hidden border">
              <div data-color-mode="light">
                <MDEditor
                  value={content}
                  onChange={(v) => setContent(v || "")}
                  height={520}
                  preview="edit"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              Tip: Use markdown. Add images with `![](https://...)`.
            </div>

            <button
              onClick={() =>
                createPost.mutate({
                  title,
                  content,
                  slug,
                  categoryId: selectedCategory === "" ? undefined : Number(selectedCategory),
                })
              }
              disabled={
                createPost.status === "pending" ||
                !title.trim() ||
                !content.trim() ||
                !slug.trim()
              }
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg text-white font-semibold ${
                createPost.status === "pending" ? "bg-blue-400 cursor-wait" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {createPost.status === "pending" ? (
                <>
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" className="opacity-30" />
                    <path d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="white" />
                  </svg>
                  Saving...
                </>
              ) : (
                "Post"
              )}
            </button>
          </div>
        </section>

        
        <aside
          className={`bg-white dark:bg-neutral-900 rounded-2xl p-4 shadow transition-all ${
            sidebarOpen ? "block" : "hidden lg:block"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Your Posts</h3>
            <button
              onClick={() => (sidebarOpen ? closeSidebar() : openSidebar())}
              className="text-sm text-muted-foreground"
            >
              {sidebarOpen ? "Hide" : "Show"}
            </button>
          </div>

          <div className="space-y-3 max-h-[60vh] overflow">
            {posts.length === 0 ? (
              <div className="text-sm text-muted-foreground">No posts yet.</div>
            ) : (
              posts.map((p: any) => (
                <div key={p.id} className="p-3 cursor-pointer rounded-lg border hover:border-blue-600">
                  <a href={`/posts/${p.slug}`} className="font-medium text-blue-600">
                    {p.title}
                  </a>
                  <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {p.content}
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>
      </main>

      <Footer />

      {toast.show && (
        <div className="fixed right-6 top-6 bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg">
          {toast.message}
        </div>
      )}
    </div>
  );
}


