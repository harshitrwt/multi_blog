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

      <button
        disabled={updatePost.isPending}
        onClick={() =>
          updatePost.mutate({
            slug,
            title,
            content,
          })
        }
        className={`mx-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${updatePost.isPending ? "opacity-70 cursor-not-allowed" : ""
          }`}
      >
        {updatePost.isPending ? (
          <>
            <svg
              className="w-5 h-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            Saving...
          </>
        ) : (
          "Save Changes"
        )}
      </button>

    </div>
  );

}
