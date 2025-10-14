'use client';

import { trpc } from '@/lib/trpcClient';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function CategoryPage() {
  const { slug } = useParams() as { slug: string };
  const { data: category, isLoading } = trpc.category.getBySlug.useQuery({ slug });

  if (isLoading) return <p className="text-center py-10">Loading category...</p>;
  if (!category) return <p className="text-center py-10">Category not found.</p>;

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-blue-600 dark:text-blue-400">
        {category.name}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {category.posts.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
            No posts in this category yet.
          </p>
        ) : (
          category.posts.map((post:any) => (
            <Link key={post.id} href={`/posts/${post.slug}`} className="block">
              <div className="p-6 h-64 flex flex-col justify-between border border-gray-200 dark:border-neutral-800 rounded-xl shadow-md hover:shadow-lg hover:border-blue-600 dark:hover:border-blue-400 transition duration-300 bg-white dark:bg-neutral-950 overflow-hidden">
                <Image
                  src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROJUlFa45ohQxDE6B3NaIWS7DGbrVucE3UhA&s"}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 mb-2">
                  {post.content}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
