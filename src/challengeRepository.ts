import { ChallengeRow, PrismaClient } from "@prisma/client";

export type ChallengeRepository = {
  getAll: () => Promise<ChallengeRow[]>;
  // getById: () => Promise<ChallengeRow>;
  // create: () => Promise<string>;
  // delete: () => Promise<void>;
};

export const ChallengeRepositoryFactory = (prismaClient: PrismaClient) => {
  return {
    getAll: () => {
      return prismaClient.challengeRow.findMany();
    },
    // getById: () => {},
    // create: () => {},
    // delete: () => {},
  };
};
