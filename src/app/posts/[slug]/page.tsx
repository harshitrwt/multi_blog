'use client';

import { trpc } from '@/lib/trpcClient';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function PostPage() {
  const { slug } = useParams() as { slug: string };
  const { data: post, isLoading } = trpc.post.getBySlug.useQuery({ slug });

  if (isLoading) return <p className="text-center py-10">Loading post...</p>;
  if (!post) return <p className="text-center py-10">Post not found.</p>;

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <Image
        src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROJUlFa45ohQxDE6B3NaIWS7DGbrVucE3UhA&s"}
        alt={post.title}
        width={1200}
        height={600}
        className="w-full h-64 object-cover rounded-xl mb-6"
      />
      <h1 className="text-4xl font-extrabold mb-4 text-blue-600 dark:text-blue-400">
        {post.title}
      </h1>

      {post.category && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Category: {post.category.name}
        </p>
      )}

      <div className="prose dark:prose-invert max-w-none">
        <p>{post.content}</p>
      </div>
    </article>
  );
}


