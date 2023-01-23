import { z } from "zod";
import { procedure, router } from "../trpc";

const rooms = router({
  list: procedure
    .query(async ({ctx}) => {
      const rooms = await ctx.prisma.room.findMany({
        select: {
          id: true,
          title: true
        },
      })
      return rooms;
    }),
  byId: procedure
    .input(z.number().int("Room id should be integer"))
    .query(async ({input, ctx}) => {
      const room = await ctx.prisma.room.findUniqueOrThrow({
        where: {
          id: input,
        },
        include: {
          cleanings: {
            orderBy: {
              from: 'asc'
            }
          }
        },
        
      })
      return room
    }),
  addCleaning: procedure
    .input(z.object({
      roomId: z.number().int(),
      from: z.string(),
      to: z.string()
    }))
    .mutation(async ({input, ctx}) => {
      const newCleaning = await ctx.prisma.cleaning.create({
        data: input
      })
      return newCleaning
    })
})

export default rooms;