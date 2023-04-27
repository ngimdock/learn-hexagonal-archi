import { PrismaClient } from "@prisma/client";

export const challengeServiceFactory = (prismaClient: PrismaClient) => {
  return {
    getChallenges: () => {
      return prismaClient.challengeRow.findMany();
    },
    getChallenge: () => {},
    createChallenge: () => {},
    deleteChallenge: () => {},
  };
};
