import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { categories } from "../../lib/schema";
import { eq } from "drizzle-orm";

export const categoryRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.categories.findMany();
  }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(2),
        description: z.string().optional(),
        slug: z.string().min(2),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const [category] = await ctx.db.insert(categories).values(input).returning();
      return category;

    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db
        .delete(categories)
        .where(eq(categories.id, input.id));
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.query.categories.findFirst({
        where: (category) => eq(category.id, input.id),
      });
    }),
});
