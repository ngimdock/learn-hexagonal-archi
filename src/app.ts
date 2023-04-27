import { PrismaClient } from "@prisma/client";
import express from "express";
import { challengeController } from "./challengeController";
import { challengeRepositoryFactory } from "./challengeRepository";

export const appFactory = () => {
  const app = express();

  app.use(express.json());

  const prismaClient = new PrismaClient();

  app.head("/status", (req, res) => {
    res.sendStatus(200);
  });

  const ChallengeRepository = challengeRepositoryFactory(prismaClient);

  challengeController(app, prismaClient, ChallengeRepository);

  return app;
};
