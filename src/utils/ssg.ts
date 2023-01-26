import { createContext } from "@/server/context";
import { appRouter } from "@/server/routers/_app";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";

export const serverSideTRPC = () =>
  createProxySSGHelpers({
    router: appRouter,
    ctx: createContext(),
    transformer: superjson,
  });
