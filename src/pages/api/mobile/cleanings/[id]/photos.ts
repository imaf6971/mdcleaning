import { handleUnallowedMethod, isAllowedMethod } from "@/utils/api/req";
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

  if (req.headers["content-type"] !== 'octe')
}
