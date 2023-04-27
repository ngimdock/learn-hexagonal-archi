import { ChallengeRow } from "@prisma/client";

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
