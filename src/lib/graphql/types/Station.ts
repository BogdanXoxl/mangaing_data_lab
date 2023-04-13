import { objectType } from "nexus";

export const Station = objectType({
  name: "Station",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("station_form");
  },
});
