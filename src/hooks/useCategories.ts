"use client";

import { trpc } from "@/lib/trpcClient";

export function useCategories() {
  const { data: categories = [], isLoading } = trpc.category.getAll.useQuery();
  return { categories, isLoading };
}
