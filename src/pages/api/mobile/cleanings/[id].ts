import { NextApiRequest, NextApiResponse } from "next";
import {
  handleApiErrors,
  handleUnallowedMethod,
  isAllowedMethod,
} from "@/utils/api/req";
import { createTRPCCaller } from "@/utils/ssg";

const ALLOWED_METHODS = ["PATCH"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!isAllowedMethod(req.method, ALLOWED_METHODS)) {
    handleUnallowedMethod(res);
    return;
  }

  const cleaningId = parseInt(req.query.id as string);

  const trpc = createTRPCCaller();
  try {
    const finisedCleaning = await trpc.cleanings.finishCleaning(cleaningId);
    res.status(200).json({ data: finisedCleaning });
    return;
  } catch (error) {
    handleApiErrors(error, res);
    return;
  }
}
