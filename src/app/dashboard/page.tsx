'use client';

import { trpc } from '@/lib/trpcClient';
import { useState } from 'react';

export default function DashboardPage() {
    // Post state
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [slug, setSlug] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<number | undefined>();

    // Category state
    const [categoryName, setCategoryName] = useState('');
    const [categorySlug, setCategorySlug] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');

    const utils = trpc.useUtils();

    // Queries to fetch current data
    const { data: categories } = trpc.category.getAll.useQuery();
    const { data: posts } = trpc.post.getAll.useQuery();
    // Optional: could fetch post-category assignments per post if desired

    // Mutation to create category
    const createCategory = trpc.category.create.useMutation({
        onSuccess: () => {
            utils.category.getAll.invalidate();
            setCategoryName('');
            setCategorySlug('');
            setCategoryDescription('');
        },
    });

    // Mutation to create post-category assignment
    const assignCategory = trpc.postCategory.assign.useMutation({
        onSuccess: () => {
            utils.postCategory.getByPost.invalidate();
            utils.post.getAll.invalidate();
        },
    });

    // Create post mutation (returns post including id)
    const createPost = trpc.post.create.useMutation({
        onSuccess: (newPost) => {
            utils.post.getAll.invalidate();
            setTitle('');
            setContent('');
            setSlug('');
            if (selectedCategory && newPost?.id) {
                assignCategory.mutate({
                    postId: newPost.id,
                    categoryId: selectedCategory,
                });
            }
        },
    });

    return (
        <div className="p-8">
            <h1 className="text-xl font-bold mb-4">Create Category</h1>
            <input
                className="border p-2 mb-2 w-full"
                placeholder="Category Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
            />
            <input
                className="border p-2 mb-2 w-full"
                placeholder="Slug"
                value={categorySlug}
                onChange={(e) => setCategorySlug(e.target.value)}
            />
            <input
                className="border p-2 mb-2 w-full"
                placeholder="Description (optional)"
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
            />
            <button
                className="bg-green-600 text-white p-2 rounded mb-4"
                onClick={() =>
                    createCategory.mutate({
                        name: categoryName,
                        slug: categorySlug,
                        description: categoryDescription || undefined,
                    })
                }
                disabled={
                    createCategory.status === 'pending' ||
                    !categoryName ||
                    !categorySlug
                }
            >
                Create Category
            </button>

            <h2 className="text-lg font-semibold mt-6">All Categories</h2>
            <ul>
                {categories?.map((c) => (
                    <li key={c.id}>
                        {c.name} (slug: {c.slug}) {c.description && ` - ${c.description}`}
                    </li>
                ))}
            </ul>

            <h1 className="text-xl font-bold mb-4 mt-10">Create Post</h1>
            <input
                className="border p-2 mb-2 w-full"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className="border p-2 mb-2 w-full"
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <input
                className="border p-2 mb-2 w-full"
                placeholder="Slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
            />
            <select
                className="border p-2 mb-2 w-full"
                value={selectedCategory ?? ''}
                onChange={(e) =>
                    setSelectedCategory(e.target.value ? Number(e.target.value) : undefined)
                }
            >
                <option value="">Select category</option>
                {categories?.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
            </select>
            <button
                className="bg-blue-600 text-white p-2 rounded"
                onClick={() =>
                    createPost.mutate({
                        title,
                        content,
                        slug,
                        published: true,
                    })
                }
                disabled={
                    createPost.status === 'pending' ||
                    !title ||
                    !content ||
                    !slug ||
                    !selectedCategory
                }
            >
                Post
            </button>

            <h2 className="text-lg font-semibold mt-6">All Posts</h2>
            <ul>
                {posts?.map(p => (
                    <li key={p.id}>{p.title}</li>
                ))}

            </ul>
        </div>
    );
}
