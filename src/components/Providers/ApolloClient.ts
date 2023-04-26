import type { NormalizedCacheObject } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

let client: ApolloClient<NormalizedCacheObject> | null = null;

export const getClient = () => {
  // eslint-disable-next-line no-console
  console.log("here>> ", process.env.HOST);
  if (!client || typeof window === "undefined") {
    client = new ApolloClient({
      uri: `${process.env.HOST}/api/graphql`,
      cache: new InMemoryCache(),
    });
  }

  return client;
};
