import { router } from "../trpc";
import rooms from "./rooms";
import cleaningPlan from "./cleaningPlan";
import cleaners from "./cleaners";

export const appRouter = router({
  rooms,
  cleaningPlan,
  cleaners,
});

export type AppRouter = typeof appRouter;
