import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { NextApiResponse } from "next";

export function isAllowedMethod(
  method: string | undefined,
  allowedMethods: string[]
) {
  if (method === undefined) {
    return false;
  }
  return allowedMethods.includes(method);
}

export function handleUnallowedMethod(res: NextApiResponse) {
  res.status(405).json({ error: { message: "This method is not allowed!" } });
}

export function handleApiErrors(error: unknown, res: NextApiResponse) {
  if (error instanceof TRPCError) {
    const httpStatusCode = getHTTPStatusCodeFromError(error);
    res.status(httpStatusCode).json({ error: { message: error.message } });
    return;
  }

  res.status(500).json({ error: { message: "Unknown error" } });
}
