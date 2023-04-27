import { PrismaClient } from "@prisma/client";

export const challengeRepository = (prismaClient: PrismaClient) => {
  return {
    getAll: () => {},
    getById: () => {},
    create: () => {},
    delete: () => {},
  };
};
