import { objectType } from "nexus";

export const Train = objectType({
  name: "Train",
  definition(t) {
    t.int("id");
  },
});
