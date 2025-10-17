import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { postCategories } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

export const postCategoryRouter = router({
  assign: publicProcedure
    .input(z.object({ postId: z.number(), categoryIds: z.array(z.number()) }))
    .mutation(async ({ input, ctx }) => {
      const records = input.categoryIds.map((id) => ({
        postId: input.postId,
        categoryId: id,
      }));
      await ctx.db.insert(postCategories).values(records);
      return { success: true };
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
      await ctx.db
        .delete(postCategories)
        .where(and(eq(postCategories.postId, input.postId), eq(postCategories.categoryId, input.categoryId)));
      return { success: true };
    }),
});
