import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { procedure, router } from "../trpc";

const rooms = router({
  list: procedure.query(async ({ ctx }) => {
    const rooms = await ctx.prisma.room.findMany({
      select: {
        id: true,
        title: true,
        _count: {
          select: { reviews: true },
        },
      },
    });
    return rooms;
  }),
  findById: procedure
    .input(z.number().int("Room id should be integer"))
    .query(async ({ input, ctx }) => {
      try {
        return await ctx.prisma.room.findUniqueOrThrow({
          where: {
            id: input,
          },
          include: {
            plannedCleanings: {
              include: {
                cleaner: true,
              },
              orderBy: {
                from: "asc",
              },
            },
            reviews: true,
          },
        });
      } catch (error) {
        throw new TRPCError({
          message: `Cannot find room by id ${input}`,
          code: "NOT_FOUND",
          cause: error,
        });
      }
    }),
  add: procedure
    .input(z.object({ title: z.string().min(1) }))
    .mutation(async ({ input, ctx }) => {
      const newRoom = await ctx.prisma.room.create({
        data: input,
      });
      return newRoom;
    }),
  deleteById: procedure
    .input(z.number().int())
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.room.delete({
        where: {
          id: input,
        },
      });
    }),
  addReview: procedure
    .input(
      z.object({
        name: z.string(),
        text: z.string(),
        roomId: z.number().int(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.review.create({
        data: {
          ...input,
          createdAt: new Date(),
        },
      });
    }),
  startCleaning: procedure
    .input(z.number().int())
    .mutation(async ({ input, ctx }) => {
      const newCleaning = await ctx.prisma.actualCleaning.create({
        data: {
          roomId: input,
          startTime: new Date(),
        },
      });
      return newCleaning;
    }),
});

export default rooms;
