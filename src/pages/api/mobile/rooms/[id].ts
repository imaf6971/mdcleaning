import { appRouter } from "@/server/routers/_app";
import { NextApiRequest, NextApiResponse } from "next";
import { createContext } from "@/server/context";
import { handleApiErrors, handleUnallowedMethod, isAllowedMethod } from "@/utils/api/req";

const ALLOWED_METHODS = ["GET"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!isAllowedMethod(req.method, ALLOWED_METHODS)) {
    handleUnallowedMethod(res);
    return;
  }

  const { id } = req.query;
  const caller = appRouter.createCaller(createContext());
  try {
    const room = await caller.rooms.findById(parseInt(id as string));
    res.status(200).json({ data: { id: room.id, title: room.title } });
    return;
  } catch (error) {
    handleApiErrors(error, res);
    return;
  }
}
