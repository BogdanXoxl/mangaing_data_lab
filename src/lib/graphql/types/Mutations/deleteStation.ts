import { intArg, mutationField, nonNull } from "nexus";
import type { ValidationRules } from "nexus-validate/dist/rules";

export const deleteStation = mutationField("deleteStation", {
  type: "Station",
  args: {
    id: nonNull(intArg()),
  },
  validate: ({ number }: ValidationRules) => ({
    id: number().required(),
  }),
  resolve: (_parent, args, ctx) => {
    return ctx.prisma.stations.delete({
      where: {
        id: args.id,
      },
    });
  },
});
