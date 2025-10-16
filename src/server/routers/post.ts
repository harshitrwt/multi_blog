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
      .leftJoin(categories, eq(posts.categoryId, categories.id));

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
      const [inserted] = await db
        .insert(posts)
        .values({
          title: input.title,
          slug: input.slug,
          categoryId: input.categoryId ?? null,
          content: input.content,
        })
        .returning();

      return inserted;
    }),

  update: publicProcedure
    .input(
      z.object({
        slug: z.string(),
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { slug, title, content } = input;
      const [updated] = await ctx.db
        .update(posts)
        .set({ title, content })
        .where(eq(posts.slug, slug))
        .returning();
      return updated;
    }),



  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.query.posts.findFirst({
        where: eq(posts.slug, input.slug),
        with: {
          postCategories: {
            with: {
              category: true,
            },
          },
        },
      }) as any;

      if (!post) return null;

      const category = post.postCategories?.[0]?.category || null;

      return {
        ...post,
        category,
      };
    }),
});


