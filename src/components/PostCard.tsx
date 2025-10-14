import Link from "next/link";
import { buttonVariants } from "./ui/button";

export function PostCard({ posts }: { posts: any[] }) {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-blue-600 dark:text-blue-400">
        Your Posts
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
            You have not written any posts yet.
          </p>
        ) : (
          posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.slug}`} className="block">
              <div className="p-6 h-44 border-2 border-gray-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-md shadow-white hover:shadow-blue-600 transition duration-300 bg-white dark:bg-[#121212]">
                <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 mb-2">
                  {post.content}
                </p>
                {post.category && (
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {post.category.name}
                  </span>
                )}
              </div>
            </Link>
          ))
        )}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/user"
          className={`${buttonVariants({ size: "lg" })} bg-blue-600 text-white px-6 py-3 hover:bg-blue-700 transition`}
        >
          More Posts
        </Link>
      </div>
    </section>
  );
}
