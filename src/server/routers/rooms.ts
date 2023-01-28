import { z } from "zod";
import { procedure, router } from "../trpc";

const rooms = router({
  list: procedure.query(async ({ ctx }) => {
    const rooms = await ctx.prisma.room.findMany({
      select: {
        id: true,
        title: true,
      },
    });
    return rooms;
  }),
  byId: procedure
    .input(z.number().int("Room id should be integer"))
    .query(async ({ input, ctx }) => {
      const room = await ctx.prisma.room.findUniqueOrThrow({
        where: {
          id: input,
        },
        include: {
          cleanings: {
            orderBy: {
              from: "asc",
            },
          },
        },
      });
      return room;
    }),
  addCleaning: procedure
    .input(
      z.object({
        roomId: z.number().int(),
        from: z.date(),
        to: z.date(),
        cleanerId: z.number().int(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newCleaning = await ctx.prisma.cleaning.create({
        data: input,
      });
      return newCleaning;
    }),
  add: procedure
    .input(z.object({ title: z.string().min(1) }))
    .mutation(async ({ input, ctx }) => {
      const newRoom = await ctx.prisma.room.create({
        data: input,
      });
      return newRoom;
    }),
});

export default rooms;
