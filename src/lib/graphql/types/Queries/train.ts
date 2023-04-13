import { list, nonNull, queryField } from "nexus";

export const trainQueryField = queryField("trains", {
  type: nonNull(list("Train")),
  resolve: (_parent, _args, ctx) => ctx.prisma.trains.findMany({ select: { id: true } }),
});
