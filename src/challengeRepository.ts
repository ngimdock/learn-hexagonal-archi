import { ChallengeRow, PrismaClient } from "@prisma/client";

export type ChallengeRepository = {
  getAll: () => Promise<ChallengeRow[]>;
  getById: (id: string) => Promise<ChallengeRow | null>;
  // create: () => Promise<string>;
  // delete: () => Promise<void>;
};

export const challengeRepositoryFactory = (
  prismaClient: PrismaClient
): ChallengeRepository => {
  return {
    getAll: () => {
      return prismaClient.challengeRow.findMany();
    },
    getById: (id: string) => {
      return prismaClient.challengeRow.findUnique({
        where: { id },
      });
    },
    // create: () => {},
    // delete: () => {},
  };
};
