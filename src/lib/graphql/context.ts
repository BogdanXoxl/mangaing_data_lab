import type { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../db";

export interface Context {
  prisma: PrismaClient;
}

export const createContext = async (
  _req: NextApiRequest,
  _res: NextApiResponse
): Promise<Context> => {
  return {
    prisma,
  };
};
