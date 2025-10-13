"use client";

import { HeroSection } from "@/components/HeroSection";
import { PostCard } from "@/components/PostCard";
import { CategoryBadge } from "@/components/CategoryBadge";
import { Navbar } from "@/components/Navbar";
import { AboutFeaturesSection } from "@/components/AbFeat";
import { Footer } from "@/components/Footer";
import { usePosts } from "@/hooks/usePosts";
import { useCategories } from "@/hooks/useCategories";

export default function HomePage() {
  const { posts, isLoading: loadingPosts } = usePosts();
  const { categories, isLoading: loadingCategories } = useCategories();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-10 space-y-10">
        <section>
          
          <div className="flex flex-wrap gap-2">
            {loadingCategories ? (
              <p>Loading...</p>
            ) : categories.length === 0 ? (
              <p>No categories yet.</p>
            ) : (
              categories.map((c) => <CategoryBadge key={c.id} category={c} />)
            )}
          </div>
        </section>

        <section>
          {loadingPosts ? (
            <p>Loading...</p>
          ) : posts.length === 0 ? (
            <p>No posts yet.</p>
          ) : (
            <div className="space-y-4">

              <PostCard posts={posts} />

            </div>
          )}
        </section>
      </main>

      <AboutFeaturesSection />

      <Footer />
    </div>
  );
}

