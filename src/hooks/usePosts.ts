"use client";

import { trpc } from "@/lib/trpcClient";

export function usePosts() {
  const { data: posts = [], isLoading } = trpc.post.getAll.useQuery();
  return { posts, isLoading };
}
