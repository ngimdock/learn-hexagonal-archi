import { PrismaClient } from "@prisma/client";
import express from "express";
import { challengeController } from "./adapters/driver/challengeController";
import { challengeServiceImplFactory } from "./hexagon/internal/challengeServiceImpl";
import { challengeRepositoryImplFactory } from "./adapters/driven/challengeRepositoryImpl";

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
