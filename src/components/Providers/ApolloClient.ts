import type { NormalizedCacheObject } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

let client: ApolloClient<NormalizedCacheObject> | null = null;

export const getClient = () => {
  if (!client || typeof window === "undefined") {
    client = new ApolloClient({
      uri: "/api/graphql",
      cache: new InMemoryCache(),
    });
  }

  return client;
};
