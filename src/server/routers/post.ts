import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { posts } from "../../lib/schema";
import { eq } from "drizzle-orm";

export const postRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.posts.findMany({ with: { categories: true } });
  }),
  create: publicProcedure
  .input(
    z.object({
      title: z.string(),
      content: z.string(),
      slug: z.string(),
      published: z.boolean().default(false),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const [post] = await ctx.db.insert(posts).values(input).returning();
    return post;
  }),

  update: publicProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().optional(),
      content: z.string().optional(),
      published: z.boolean().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const { id, ...data } = input;
      return await ctx.db.update(posts).set(data).where(eq(posts.id, id));
    }),
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.delete(posts).where(eq(posts.id, input.id));
    }),
});
