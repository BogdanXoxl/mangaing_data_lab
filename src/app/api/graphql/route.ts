import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import type { NextRequest } from "next/server";

import type { Context } from "@/lib/graphql/context";
import { createContext } from "@/lib/graphql/context";
import { schema } from "@/lib/graphql/schema";

const server = new ApolloServer<Context>({
  schema,
});

const handler = startServerAndCreateNextHandler(server, {
  context: createContext,
});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
