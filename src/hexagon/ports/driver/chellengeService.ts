import { ChallengeRow } from "@prisma/client";

export type ChallenceService = {
  getChallenges: () => Promise<ChallengeRow[]>;
  getChallenge: (id: string) => Promise<ChallengeRow>;
  createChallenge: (name: string, content: string) => Promise<string>;
  deleteChallenge: (id: string) => Promise<void>;
};
