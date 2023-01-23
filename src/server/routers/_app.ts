import { router } from "../trpc";
import rooms from "./rooms";

export const appRouter = router({
  rooms
})

export type AppRouter = typeof appRouter;