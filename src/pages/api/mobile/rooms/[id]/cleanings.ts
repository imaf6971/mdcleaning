import { createContext } from "@/server/context";
import { appRouter } from "@/server/routers/_app";
import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: { message: "This method is not allowed!" } });
    return;
  }
  const { id } = req.query;
  const trpcCaller = appRouter.createCaller(createContext());
  try {
    const cleaning = await trpcCaller.rooms.startCleaning(
      parseInt(id as string)
    );
    res.status(201).json({ data: cleaning });
    return;
  } catch (error) {
    if (error instanceof TRPCError) {
      const httpStatusCode = getHTTPStatusCodeFromError(error);
      res.status(httpStatusCode).json({ error: { message: error.message } });
      return;
    }
  }
}
