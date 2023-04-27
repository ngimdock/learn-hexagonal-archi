import { PrismaClient } from "@prisma/client";
import express from "express";
import { challengeController } from "./challengeController";
import { challengeServiceImplFactory } from "./challengeServiceImpl";
import { challengeRepositoryImplFactory } from "./challengeRepositoryImpl";

export const appFactory = () => {
  const app = express();

  app.use(express.json());

  const prismaClient = new PrismaClient();

  app.head("/status", (req, res) => {
    res.sendStatus(200);
  });

  const ChallengeRepository = challengeRepositoryImplFactory(prismaClient);
  const challengeService = challengeServiceImplFactory(ChallengeRepository);

  challengeController(app, challengeService);

  return app;
};
