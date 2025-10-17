import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { eq, inArray } from "drizzle-orm";
import { posts, postCategories, categories } from "@/lib/schema";

export const postRouter = router({
  // CREATE POST
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        slug: z.string(),
        content: z.string(),
        categoryIds: z.array(z.number()).optional(),
        published: z.boolean().default(false),
        authorId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { categoryIds = [], ...data } = input;

      const [created] = await ctx.db.insert(posts).values({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      }).returning();

      if (categoryIds.length > 0) {
        await ctx.db.insert(postCategories).values(
          categoryIds.map((cid) => ({
            postId: created.id,
            categoryId: cid,
          }))
        );
      }

      return created;
    }),

  // UPDATE POST
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        slug: z.string(),
        content: z.string(),
        categoryIds: z.array(z.number()).optional(),
        published: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, categoryIds, ...data } = input;

      const [updated] = await ctx.db
        .update(posts)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(posts.id, id))
        .returning();

      if (categoryIds) {
        await ctx.db.delete(postCategories).where(eq(postCategories.postId, id));
        if (categoryIds.length > 0) {
          await ctx.db.insert(postCategories).values(
            categoryIds.map((cid) => ({
              postId: id,
              categoryId: cid,
            }))
          );
        }
      }

      return updated;
    }),

  // GET ALL POSTS
  getAll: publicProcedure
    .input(z.object({ categoryId: z.number().optional() }).optional())
    .query(async ({ ctx, input }) => {
      if (input?.categoryId) {
        const postIds = await ctx.db
          .select({ postId: postCategories.postId })
          .from(postCategories)
          .where(eq(postCategories.categoryId, input.categoryId));

        const ids = postIds.map((p) => p.postId);
        if (!ids.length) return [];

        return ctx.db
          .select()
          .from(posts)
          .where(inArray(posts.id, ids))
          .orderBy(posts.createdAt);
      }

      return ctx.db.select().from(posts).orderBy(posts.createdAt);
    }),

  // get by slug 
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const [post] = await ctx.db
        .select()
        .from(posts)
        .where(eq(posts.slug, input.slug));

      if (!post) return null;

      // categories
      const categories = await ctx.db
        .select({
          id: postCategories.categoryId,
        })
        .from(postCategories)
        .where(eq(postCategories.postId, post.id));

      return { ...post, categories };
    }),


  
  getByCategory: publicProcedure
    .input(z.object({ categoryId: z.number() }))
    .query(async ({ ctx, input }) => {
      const postIds = await ctx.db
        .select({ postId: postCategories.postId })
        .from(postCategories)
        .where(eq(postCategories.categoryId, input.categoryId));

      const ids = postIds.map((p) => p.postId);
      if (!ids.length) return [];

      return ctx.db
        .select()
        .from(posts)
        .where(inArray(posts.id, ids))
        .orderBy(posts.createdAt);
    }),

  // DELETE 
  delete: publicProcedure
    .input(z.object({ postId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(postCategories).where(eq(postCategories.postId, input.postId));
      await ctx.db.delete(posts).where(eq(posts.id, input.postId));
      return true;
    }),
});
