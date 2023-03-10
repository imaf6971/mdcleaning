import { z } from "zod";
import { procedure, router } from "../trpc";

const cleaningPlan = router({
  deleteById: procedure
    .input(z.number().int())
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.cleaningPlan.delete({
        where: {
          id: input,
        },
      });
    }),
  create: procedure
    .input(
      z.object({
        roomId: z.number().int(),
        from: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
        to: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
        cleanerId: z.number().int(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newCleaning = await ctx.prisma.cleaningPlan.create({
        data: input,
      });
      return newCleaning;
    }),
});

export default cleaningPlan;
