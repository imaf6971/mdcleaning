import { router } from "../trpc";
import rooms from "./rooms";
import cleanings from "./cleaning";
import staff from "./staff";

export const appRouter = router({
  rooms,
  cleanings,
  staff
});

export type AppRouter = typeof appRouter;
