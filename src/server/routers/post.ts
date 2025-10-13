import { publicProcedure, router } from "@/server/trpc";
import { db } from "@/server/db";
import { posts, categories } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const postRouter = router({
  getAll: publicProcedure.query(async () => {
    const allPosts = await db
      .select({
        id: posts.id,
        title: posts.title,
        slug: posts.slug,
        content: posts.content,
        createdAt: posts.createdAt,
        published: posts.published,
        categoryId: categories.id,
        categoryName: categories.name,
        categorySlug: categories.slug,
      })
      .from(posts)
      .leftJoin(categories, eq(posts.id, categories.id)); 

    return allPosts.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      content: p.content,
      createdAt: p.createdAt,
      published: p.published,
      category: p.categoryName
        ? {
            id: p.categoryId,
            name: p.categoryName,
            slug: p.categorySlug,
          }
        : null,
    }));
  }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        slug: z.string(),
        content: z.string(),
        categoryId: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      await db.insert(posts).values({
        title: input.title,
        slug: input.slug,
        content: input.content,
      });
      return { success: true };
    }),
});
