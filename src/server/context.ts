import { inferAsyncReturnType } from "@trpc/server"
import { CreateNextContextOptions } from "@trpc/server/adapters/next"
import { prisma } from "./db"

export async function createContext(opts: CreateNextContextOptions) {
  return {
    prisma
  }
}

export type Context = inferAsyncReturnType<typeof createContext>;
