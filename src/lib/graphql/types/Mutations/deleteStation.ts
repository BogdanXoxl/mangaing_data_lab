import { intArg, mutationField, nonNull } from "nexus";

export const deleteStation = mutationField("deleteStation", {
  type: "Station",
  args: {
    id: nonNull(intArg()),
  },
  validate: ({ number }) => ({
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
