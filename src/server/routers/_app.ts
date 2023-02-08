import { router } from "../trpc";
import rooms from "./rooms";
import cleaningPlan from "./cleaningPlan";
import cleaners from "./cleaners";
import cleanings from "./cleaning";

export const appRouter = router({
  rooms,
  cleaningPlan,
  cleaners,
  cleanings,
});

export type AppRouter = typeof appRouter;
