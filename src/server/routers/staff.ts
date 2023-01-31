import { z } from "zod";
import { procedure, router } from "../trpc";

const staff = router({
  list: procedure.query(async ({ ctx }) => {
    return await ctx.prisma.staff.findMany({
      select: {
        id: true,
        lastName: true,
        firstName: true,
      },
    });
  }),
  add: procedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        patronymic: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.staff.create({
        data: input
      })
    }),
});

export default staff;
