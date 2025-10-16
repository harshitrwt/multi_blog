"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { trpc } from "@/lib/trpcClient";
import { useRouter } from "next/navigation";

export default function PostPage() {
  const { slug } = useParams() as { slug: string };
  const router = useRouter();

  const [post, setPost] = useState<any>(null);
  const { data, isLoading, error } = trpc.post.getBySlug.useQuery({ slug });

  useEffect(() => {
    if (data) {
      setPost(data);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error("post.getBySlug error:", error);
    }
  }, [error]);

  const handleEditClick = () => {
    router.push(`/editor/${slug}`);
  };
  const handleBackClick = () => {
    router.push(`/`);
  };

  if (isLoading) return <p className="text-center py-10">Loading post...</p>;
  if (error)
    return (
      <p className="text-center py-10 text-red-500">
        Error loading post. Check server logs.
      </p>
    );
  if (!post) return <p className="text-center py-10">Post not found.</p>;

  const cover =
    (post as any).coverImage ||
    "https://www.eslecollege.com/wp-content/uploads/2022/06/blog-post.png";

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-6">
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="mb-4 rounded"
          />
        )}
        <img
          src={cover}
          alt={post.title}
          width={1200}
          height={600}
          className="w-full h-64 object-cover rounded-xl"
        />
      </div>

      <h1 className="text-4xl font-extrabold mb-4 text-blue-600 dark:text-blue-400">
        {post.title}
      </h1>

      {post.category && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Category: {post.category.name}
        </p>
      )}

      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      
      <button
        onClick={handleEditClick}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow-lg"
      >
        Edit
      </button>
      <button
        onClick={handleBackClick}
        className="fixed bottom-8 left-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow-lg"
      >
        Back
      </button>
    </article>
  );
}
