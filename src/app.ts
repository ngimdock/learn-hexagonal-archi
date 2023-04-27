import { PrismaClient } from "@prisma/client";
import express from "express";
import { challengeController } from "./challengeController";
import { challengeRepositoryFactory } from "./challengeRepository";
import { challengeServiceFactory } from "./challengeServiceImpl";

export const appFactory = () => {
  const app = express();

  app.use(express.json());

  const prismaClient = new PrismaClient();

  app.head("/status", (req, res) => {
    res.sendStatus(200);
  });

  const ChallengeRepository = challengeRepositoryFactory(prismaClient);
  const challengeService = challengeServiceFactory(ChallengeRepository);

  challengeController(app, challengeService);

  return app;
};
