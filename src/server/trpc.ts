import { initTRPC } from "@trpc/server";
import superjson from "superjson";

export const t = initTRPC.context<typeof createContext>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

import { createContext } from "./context";
