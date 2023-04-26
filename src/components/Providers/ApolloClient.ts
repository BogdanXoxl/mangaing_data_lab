import type { NormalizedCacheObject } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

let client: ApolloClient<NormalizedCacheObject> | null = null;
let host: string | null | undefined = null;

export const getClient = () => {
  // eslint-disable-next-line no-console
  console.log("here>> ", host);
  if (!client || typeof window === "undefined") {
    host = process.env.HOST;
    client = new ApolloClient({
      uri: `${process.env.HOST}/api/graphql`,
      cache: new InMemoryCache(),
    });
  }

  return client;
};
