import { intArg, mutationField, nonNull } from "nexus";
import type { ValidationRules } from "nexus-validate/dist/rules";

export const deleteSchedule = mutationField("deleteSchedule", {
  type: "Schedule",
  args: {
    id: nonNull(intArg()),
  },
  validate: ({ number }: ValidationRules) => ({
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
