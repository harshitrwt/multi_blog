import Link from "next/link";

export function CategoryBadge({ category }: { category: any }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="px-3 py-1 bg-gray-200 dark:bg-neutral-800 rounded-full text-sm hover:bg-gray-300 dark:hover:bg-neutral-700 transition"
    >
      {category.name}
    </Link>
  );
}
