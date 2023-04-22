import { objectType } from "nexus";

export const Schedule = objectType({
  name: "Schedule",
  definition(t) {
    t.int("id");
    t.int("pause");
    t.int("train_id");
    t.int("station_id");
    t.int("duration");
  },
});
