import { router } from "../trpc";
import rooms from "./rooms";
import cleanings from "./cleaning";

export const appRouter = router({
  rooms,
  cleanings,
});

export type AppRouter = typeof appRouter;
