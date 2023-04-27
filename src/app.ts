import { PrismaClient } from "@prisma/client";
import express from "express";
import { challengeController } from "./adapters/driver/challengeController";
import { challengeServiceImplFactory } from "./hexagon/internal/challengeServiceImpl";
import { challengeRepositoryImplFactory } from "./adapters/driven/challengeRepositoryImpl";
import { systemTimeProvider } from "./adapters/driven/systemTimeProvider";

export const appFactory = () => {
  const app = express();

  app.use(express.json());

  const prismaClient = new PrismaClient();

  app.head("/status", (req, res) => {
    res.sendStatus(200);
  });

  const ChallengeRepository = challengeRepositoryImplFactory(prismaClient);
  const timeProvider = systemTimeProvider();

  const challengeService = challengeServiceImplFactory(
    ChallengeRepository,
    timeProvider
  );

  challengeController(app, challengeService);

  return app;
};
