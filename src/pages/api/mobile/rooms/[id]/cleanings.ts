import { createContext } from "@/server/context";
import { appRouter } from "@/server/routers/_app";
import {
  handleApiErrors,
  handleUnallowedMethod,
  isAllowedMethod,
} from "@/utils/api/req";
import { NextApiRequest, NextApiResponse } from "next";

const ALLOWED_METHODS = ["POST"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!isAllowedMethod(req.method, ALLOWED_METHODS)) {
    handleUnallowedMethod(res);
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
    handleApiErrors(error, res);
    return;
  }
}
