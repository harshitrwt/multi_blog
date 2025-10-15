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
    onSuccess: () => {
      router.push(`/post/${slug}`);
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
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>

      <input
        className="w-full p-2 mb-4 border rounded"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <MDEditor
        value={content}
        onChange={(value) => setContent(value || "")}
        height={800}
      />

      <button
        onClick={() =>
          updatePost.mutate({
            slug,
            title,
            content,
          })
        }
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}
