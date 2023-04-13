import { intArg, mutationField, nonNull } from "nexus";

export const deleteSchedule = mutationField("deleteSchedule", {
  type: "Schedule",
  args: {
    id: nonNull(intArg()),
  },
  validate: ({ number }) => ({
    id: number().required(),
  }),
  resolve: (_parent, args, ctx) => {
    return ctx.prisma.schedule.delete({
      where: {
        id: args.id,
      },
    });
  },
});
