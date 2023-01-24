import { z } from "zod";
import { procedure, router } from "../trpc";

const cleanings = router({
  deleteById: procedure
    .input(z.number().int())
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.cleaning.delete({
        where: {
          id: input,
        },
      });
    }),
});

export default cleanings;
