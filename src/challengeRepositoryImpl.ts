import { PrismaClient } from "@prisma/client";
import {
  ChallengeRepository,
  CreateChallengeData,
} from "./challengeRepository";

export const challengeRepositoryImplFactory = (
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
