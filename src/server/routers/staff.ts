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
});

export default staff;
