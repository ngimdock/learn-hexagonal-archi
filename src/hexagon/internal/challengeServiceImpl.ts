import { ValidationError } from "../../validationError";
import { v4 } from "uuid";
import { ChallenceService } from "../ports/driver/chellengeService";
import {
  ChallengeRepository,
  CreateChallengeData,
} from "../ports/driven/challengeRepository";
import { TimeProvider } from "../ports/driven/timeProvider";

export const challengeServiceImplFactory = (
  challengeRepository: ChallengeRepository,
  timeProvider: TimeProvider
): ChallenceService => {
  return {
    getChallenges: () => {
      return challengeRepository.getAll();
    },

    getChallenge: async (id) => {
      if (typeof id !== "string") {
        throw new ValidationError();
      }

      const challenge = await challengeRepository.getById(id);

      if (!challenge) throw new ValidationError();

      return challenge;
    },

    createChallenge: async (name, content) => {
      if (typeof name !== "string" || typeof content !== "string")
        throw new ValidationError();

      const today = timeProvider.getTime();
      const MONDAY = 1;
      let level = 1;

      if (content.length > 100 && content.includes(";")) {
        level = 3;
      } else if (today.getDay() === MONDAY) {
        level = 2;
      }

      const id = v4();

      const challengeData: CreateChallengeData = {
        id,
        name,
        content,
        level,
      };

      await challengeRepository.create(challengeData);

      return id;
    },

    deleteChallenge: async (id) => {
      if (typeof id !== "string") throw new ValidationError();

      await challengeRepository.delete(id);
    },
  };
};
