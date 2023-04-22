import { mutationField, nonNull, stringArg } from "nexus";
import type { ValidationRules } from "nexus-validate/dist/rules";

export const createStation = mutationField("createStation", {
  type: "Station",
  args: {
    name: nonNull(stringArg()),
    station_form: nonNull(stringArg()),
  },
  validate: ({ string }: ValidationRules) => ({
    name: string().required().trim(),
    station_form: string().required(),
  }),
  resolve: (_parent, args, ctx) => {
    return ctx.prisma.stations.create({
      data: { ...args },
    });
  },
});
