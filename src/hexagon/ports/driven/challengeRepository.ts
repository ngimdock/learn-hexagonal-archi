import { Challenge } from "../../internal/challenge";
import { CreateChallengeData } from "../../internal/types";

export type ChallengeRepository = {
  getAll: () => Promise<Challenge[]>;
  getById: (id: string) => Promise<Challenge | null>;
  create: (challengeData: CreateChallengeData) => Promise<void>;
  delete: (id: string) => Promise<void>;
};
