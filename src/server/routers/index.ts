import { router } from "@/server/trpc";
import { postRouter } from "./post";
import { categoryRouter } from "./category";
import { postCategoryRouter } from "./postCategory";

export const appRouter = router({
  post: postRouter,
  category: categoryRouter,
  postCategory: postCategoryRouter,
});

export type AppRouter = typeof appRouter;
