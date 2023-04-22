import { intArg, mutationField, nonNull, stringArg } from "nexus";
import type { ValidationRules } from "nexus-validate/dist/rules";

export const updateStation = mutationField("updateStation", {
  type: "Station",
  args: {
    id: nonNull(intArg()),
    name: nonNull(stringArg()),
    station_form: nonNull(stringArg()),
  },
  validate: ({ number, string }: ValidationRules) => ({
    id: number().required(),
    name: string().required().trim(),
    station_form: string().required(),
  }),
  resolve: (_parent, args, ctx) => {
    return ctx.prisma.stations.update({
      where: {
        id: args.id,
      },
      data: { ...args },
    });
  },
});
