"use client";

import { ApolloProvider } from "@apollo/client";
import type { ReactNode } from "react";

import { getClient } from "@/components/Providers/ApolloClient";

type Props = {
  children: ReactNode;
};

export const ProviderContainer = ({ children }: Props) => {
  return <ApolloProvider client={getClient()}>{children}</ApolloProvider>;
};
