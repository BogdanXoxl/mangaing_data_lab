import { enumType, inputObjectType, list, nonNull, nullable, queryField } from "nexus";
import type { ValidationRules } from "nexus-validate/dist/rules";

export const SortDirection = enumType({
  name: "SortDirection",
  members: ["asc", "desc"],
});

export const SortScheduleField = enumType({
  name: "SortScheduleField",
  members: ["station_id", "train_id", "pause", "duration"],
});

export const ScheduleSortType = inputObjectType({
  name: "ScheduleSortType",
  definition(t) {
    t.nullable.field("sort_direction", { type: "SortDirection" });
    t.nonNull.field("field", { type: "SortScheduleField" });
  },
});

export const ScheduleFilterType = inputObjectType({
  name: "ScheduleFilterType",
  definition(t) {
    t.nullable.int("id");
    t.nullable.int("train_id");
    t.nullable.int("pause");
    t.nullable.int("duration");
  },
});

export const scheduleQueryField = queryField("schedule", {
  type: nonNull(list("Schedule")),
  args: {
    sort: nullable(ScheduleSortType),
    filters: nullable(ScheduleFilterType),
  },
  validate: ({ string, number, object }: ValidationRules) => ({
    sort: object({
      field: string().oneOf(["station_id", "train_id", "pause", "duration"]).nonNullable(),
      sort_direction: string()
        .optional()
        .nullable()
        .oneOf(["asc", "desc", null])
        .transform((value?: string, originalValue?: string | null) =>
          originalValue === null ? "asc" : value
        ),
    }).nullable(),
    filters: object({
      id: number()
        .nullable()
        .default(undefined)
        .transform((value?: string, originalValue?: string | null) =>
          originalValue === null ? undefined : value
        ),
      train_id: number()
        .nullable()
        .default(undefined)
        .transform((value?: string, originalValue?: string | null) =>
          originalValue === null ? undefined : value
        ),
      pause: number()
        .nullable()
        .default(undefined)
        .transform((value?: string, originalValue?: string | null) =>
          originalValue === null ? undefined : value
        ),
      duration: number()
        .nullable()
        .default(undefined)
        .transform((value?: string, originalValue?: string | null) =>
          originalValue === null ? undefined : value
        ),
    }).nullable(),
  }),
  resolve: (_parent, args, ctx) => {
    return ctx.prisma.schedule.findMany({
      ...(args.filters ? { where: { ...args.filters } } : {}),
      orderBy: {
        [args.sort?.field as string]: args.sort?.sort_direction,
      },
      select: {
        id: true,
        station_id: true,
        train_id: true,
        pause: true,
        duration: true,
      },
    });
  },
});
