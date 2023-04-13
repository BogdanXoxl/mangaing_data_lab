import { intArg, mutationField, nonNull } from "nexus";

export const updateSchedule = mutationField("updateSchedule", {
  type: "Schedule",
  args: {
    id: nonNull(intArg()),
    station_id: nonNull(intArg()),
    train_id: nonNull(intArg()),
    pause: nonNull(intArg()),
    duration: nonNull(intArg()),
  },
  validate: ({ number }) => ({
    id: number().required(),
    station_id: number().required(),
    train_id: number().required(),
    pause: number().required(),
    duration: number().required(),
  }),
  resolve: (_parent, args, ctx) => {
    return ctx.prisma.schedule.update({
      where: {
        id: args.id,
      },
      data: { ...args },
    });
  },
});
