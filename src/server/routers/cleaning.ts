import { z } from "zod";
import { procedure, router } from "../trpc";

const cleanings = router({
  finishCleaning: procedure
    .input(z.number().int())
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.$transaction(async (tx) => {
        const cleaning = await tx.actualCleaning.findUniqueOrThrow({
          where: {
            id: input,
          },
        });
        if (cleaning.finishTime !== null) {
          throw new Error("Cleaning already finished");
        }
        cleaning.finishTime = new Date();
        return await tx.actualCleaning.update({
          where: {
            id: cleaning.id,
          },
          data: cleaning,
        });
      });
    }),
});

export default cleanings;
