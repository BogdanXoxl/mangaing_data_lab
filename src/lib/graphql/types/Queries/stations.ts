import { enumType, inputObjectType, list, nullable, queryField } from "nexus";

export const SortStationsField = enumType({
  name: "SortStationsField",
  members: ["name", "station_form"],
});

export const StationsSortType = inputObjectType({
  name: "StationsSortType",
  definition(t) {
    t.nullable.field("sort_direction", { type: "SortDirection" });
    t.nonNull.field("field", { type: "SortStationsField" });
  },
});

export const StationsFilterType = inputObjectType({
  name: "StationsFilterType",
  definition(t) {
    t.nullable.int("id");
    t.nullable.string("name");
    t.nullable.string("station_form");
  },
});

export const stationsQueryField = queryField("stations", {
  type: list("Station"),
  args: {
    sort: nullable(StationsSortType),
    filters: nullable(StationsFilterType),
  },
  validate: ({ string, number, object }) => ({
    sort: object({
      field: string().oneOf(["name", "station_form"]).nonNullable(),
      sort_direction: string()
        .optional()
        .nullable()
        .oneOf(["asc", "desc", null])
        .transform((value, originalValue) => (originalValue === null ? "asc" : value)),
    }).nullable(),
    filters: object({
      id: number()
        .nullable()
        .default(undefined)
        .transform((value, originalValue) => (originalValue === null ? undefined : value)),
      name: string()
        .nullable()
        .default(undefined)
        .transform((value, originalValue) => (originalValue === null ? undefined : value)),
      station_form: string()
        .nullable()
        .default(undefined)
        .transform((value, originalValue) => (originalValue === null ? undefined : value)),
    }).nullable(),
  }),
  resolve: (_parent, args, ctx) => {
    return ctx.prisma.stations.findMany({
      ...(args.filters ? { where: { ...args.filters } } : {}),
      orderBy: {
        [args.sort?.field as string]: args.sort?.sort_direction,
      },
      select: {
        id: true,
        name: true,
        station_form: true,
      },
    });
  },
});
