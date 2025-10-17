"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { trpc } from "@/lib/trpcClient";
import { useUIStore } from "../store/uiStore";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const username = isLoaded ? user?.firstName || user?.username || "Blogger" : "Blogger";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [newCategoryModal, setNewCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const openSidebar = useUIStore((s) => s.openSidebar);
  const closeSidebar = useUIStore((s) => s.closeSidebar);
  const showToast = useUIStore((s) => s.showToast);
  const hideToast = useUIStore((s) => s.hideToast);
  const toast = useUIStore((s) => s.toast);

  const utils = trpc.useContext();
  const { data: categories = [] } = trpc.category.getAll.useQuery();
  const { data: posts = [] } = trpc.post.getAll.useQuery();

  const createCategory = trpc.category.create.useMutation({
    onSuccess: () => {
      utils.category.getAll.invalidate();
      showToast("Category created");
      setTimeout(hideToast, 2000);
      setNewCategoryName("");
      setNewCategoryModal(false);
    },
  });

  const createPost = trpc.post.create.useMutation({
    onSuccess: (created) => {
      utils.post.getAll.invalidate();
      showToast(created.published ? "Post Published" : "Saved as Draft");
      setTitle("");
      setContent("");
      setSlug("");
      setSelectedCategories([]);
      setTimeout(() => {
        hideToast();
        router.push("/user");
      }, 1000);
    },
  });

  const handleCreateCategory = () => {
    const name = newCategoryName.trim();
    if (!name) return;
    const s = name.toLowerCase().replace(/\s+/g, "-");
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
          <h2 className="text-xl font-semibold text-blue-600 mb-4">New Post</h2>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            className="w-full mb-4 p-3 rounded-lg border focus:ring-2 focus:ring-blue-400"
          />

          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Slug (url-friendly)"
            className="p-2 rounded-lg border w-full mb-3"
          />

          <div className="mb-5">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Select Categories</h4>

            <div className="flex flex-wrap gap-2 mb-3">
              {categories.map((c: any) => {
                const isSelected = selectedCategories.includes(c.id);
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedCategories(selectedCategories.filter((id) => id !== c.id));
                      } else {
                        setSelectedCategories([...selectedCategories, c.id]);
                        showToast(`Added category: ${c.name}`);
                        setTimeout(hideToast, 1000);
                      }
                    }}
                    className={`px-3 py-1 rounded-full border text-sm ${isSelected
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                      }`}
                  >
                    {c.name}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setNewCategoryModal(true)}
              className="px-3 py-2 rounded-lg bg-sky-600 text-white"
            >
              + Add category
            </button>

            {selectedCategories.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedCategories.map((id) => {
                  const c = categories.find((x: any) => x.id === id);
                  return (
                    <span
                      key={id}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {c?.name}
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mb-4 border rounded-lg overflow-hidden">
            <div data-color-mode="light">
              <MDEditor
                value={content}
                onChange={(v) => setContent(v || "")}
                height={520}
                preview="edit"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() =>
                createPost.mutate({
                  title,
                  content,
                  slug,
                  categoryIds: selectedCategories,
                  published: false,
                })
              }
              disabled={!title.trim() || !content.trim()}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
            >
              Save Draft
            </button>

            <button
              onClick={() =>
                createPost.mutate({
                  title,
                  content,
                  slug,
                  categoryIds: selectedCategories,
                  published: true,
                })
              }
              disabled={
                createPost.status === "pending" ||
                !title.trim() ||
                !content.trim() ||
                !slug.trim()
              }
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg text-white font-semibold ${createPost.status === "pending"
                ? "bg-blue-400 cursor-wait"
                : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {createPost.status === "pending" ? "Saving..." : "Publish"}
            </button>
          </div>
        </section>

        <aside
  className={`bg-white dark:bg-neutral-900 rounded-2xl p-4 shadow transition-all duration-300 ${sidebarOpen ? "opacity-100 translate-x-0 w-[320px]" : "opacity-90 translate-x-0 w-8"}`}
>
  <div className="flex items-center justify-between mb-3">
    
    <h3 className={`text-lg font-semibold transition-all duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0"}`}>
      Your Posts
    </h3>
    
    <button
      onClick={() => useUIStore.getState().toggleSidebar()}
      className={`text-sm border-1 boder-blue-600 bg-blue-600 p-2 text-white hover:underline transition-all duration-300 ${sidebarOpen ? "" : "pl-3"}`}
      style={{ width: "max-content" }}
    >
      {sidebarOpen ? "Hide" : "Show"}
    </button>
  </div>

  
  <div className={`space-y-3 max-h-[60vh] overflow-y-auto transition-all duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0"}`}>
    {posts.length === 0 ? (
      <div className="text-sm text-muted-foreground">No posts yet.</div>
    ) : (
      posts.map((p: any) => (
        <div
          key={p.id}
          className="p-3 cursor-pointer rounded-lg border hover:border-blue-600"
        >
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


      {newCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-xl w-80">
            <h3 className="text-lg font-semibold mb-4 text-center">Add New Category</h3>
            <input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Category name"
              className="w-full mb-4 p-2 rounded-lg border"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setNewCategoryModal(false)}
                className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCategory}
                className="px-3 py-1 rounded bg-blue-600 text-white"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {toast.show && (
        <div className="fixed right-6 top-6 bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg">
          {toast.message}
        </div>
      )}
    </div>
  );
}
