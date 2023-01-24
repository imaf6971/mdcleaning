import { createContext } from "@/server/context";
import { appRouter } from "@/server/routers/_app";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";

export const ssg = () => createProxySSGHelpers({
  router: appRouter,
  ctx: createContext(),
  // transformer: superjson, // optional - adds superjson serialization
});
