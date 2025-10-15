import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { categories, postCategories } from "@/lib/schema";
import { eq } from "drizzle-orm";

export const postCategoryRouter = router({
  assign: publicProcedure
    .input(z.object({ postId: z.number(), categoryId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const [postCategory] = await ctx.db.insert(postCategories).values(input).returning();
      return postCategory;
    }),

  getByPost: publicProcedure
    .input(z.object({ postId: z.number() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.query.postCategories.findMany({
        where: eq(postCategories.postId, input.postId),
        with: { category: true },
      });
    }),

  remove: publicProcedure
    .input(z.object({ postId: z.number(), categoryId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db
        .delete(postCategories)
        .where(
          eq(postCategories.postId, input.postId)
          && eq(postCategories.categoryId, input.categoryId)
        );
    }),
});
