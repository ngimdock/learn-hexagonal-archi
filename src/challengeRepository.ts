import { ChallengeRow, PrismaClient } from "@prisma/client";

export type CreateChallengeData = {
  id: string;
  name: string;
  content: string;
  level: number;
};

export type ChallengeRepository = {
  getAll: () => Promise<ChallengeRow[]>;
  getById: (id: string) => Promise<ChallengeRow | null>;
  create: (challengeData: CreateChallengeData) => Promise<void>;
  delete: (id: string) => Promise<void>;
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

    create: async (challengeData: CreateChallengeData) => {
      await prismaClient.challengeRow.create({
        data: challengeData,
      });
    },

    delete: async (id) => {
      await prismaClient.challengeRow.delete({ where: { id } });
    },
  };
};
