import { intArg, mutationField, nonNull } from "nexus";

export const createSchedule = mutationField("createSchedule", {
  type: "Schedule",
  args: {
    station_id: nonNull(intArg()),
    train_id: nonNull(intArg()),
    pause: nonNull(intArg()),
    duration: nonNull(intArg()),
  },
  validate: ({ number }) => ({
    station_id: number().required(),
    train_id: number().required(),
    pause: number().required(),
    duration: number().required(),
  }),
  resolve: (_parent, args, ctx) => {
    return ctx.prisma.schedule.create({
      data: { ...args },
    });
  },
});
