import { makeSchema } from "nexus";
import { validatePlugin } from "nexus-validate";
import path from "path";

import * as types from "./types";

export const schema = makeSchema({
  types,
  outputs: {
    typegen: path.join(process.cwd(), "generated/nexus-typegen.ts"),
    schema: path.join(process.cwd(), "generated/schema.graphql"),
  },
  plugins: [validatePlugin()],
});
