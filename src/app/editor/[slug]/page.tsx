"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useEditorStore } from "../../store/editorStore";
import { trpc } from "@/lib/trpcClient";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function EditorPage() {
  const { slug } = useParams() as { slug: string };
  const router = useRouter();
  const { title, content, setTitle, setContent, setSlug } = useEditorStore();

  const { data: post, isLoading } = trpc.post.getBySlug.useQuery({ slug });

  const updatePost = trpc.post.update.useMutation({
    onSuccess: (updatedPost) => {
      router.push(`/posts/${updatedPost.slug}`);
    },
  });

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setSlug(post.slug);
    }
  }, [post, setTitle, setContent, setSlug]);

  if (isLoading) return <div>Loading...</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <div className="max-w-5xl mb-10 mx-auto py-10 px-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Post</h1>

      <input
        className="w-full p-3 mb-6 border border-gray-300 dark:border-gray-700 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div data-color-mode="light" className="mb-6">
        <MDEditor
          value={content}
          onChange={(value) => setContent(value || "")}
          height={700}
          preview="edit"
          className="md:w-[100%] rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm"
        />
      </div>

      <div className="flex justify-center gap-4 mt-6">
  <button
    disabled={updatePost.isPending}
    onClick={() =>
      updatePost.mutate({
        id: post.id,
        slug,
        title,
        content,
        published: false,
        categoryIds: post.categories?.map((c: any) => c.id) || [],
      })
    }
    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-8 py-3 rounded-lg"
  >
    {updatePost.isPending ? "Saving..." : "Save Draft"}
  </button>

  <button
    disabled={updatePost.isPending}
    onClick={() =>
      updatePost.mutate({
        id: post.id,
        slug,
        title,
        content,
        published: true,
        categoryIds: post.categories?.map((c: any) => c.id) || [],
      })
    }
    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg"
  >
    {updatePost.isPending ? "Publishing..." : "Publish"}
  </button>
</div>

    </div>
  );
}
