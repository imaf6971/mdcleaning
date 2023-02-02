import { appRouter } from "@/server/routers/_app";
import { NextApiRequest, NextApiResponse } from "next";
import { createContext } from "@/server/context";
import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  const caller = appRouter.createCaller(createContext());
  try {
    const room = await caller.rooms.findById(parseInt(id as string));
    res.status(200).json({ data: { id: room.id, title: room.title } });
    return;
  } catch (cause) {
    if (cause instanceof TRPCError) {
      const httpStatusCode = getHTTPStatusCodeFromError(cause);
      res.status(httpStatusCode).json({ error: { message: cause.message } });
      return;
    }

    res.status(500).json({
      error: { message: `Error while acessing room with id ${id}` },
    });
  }
}
