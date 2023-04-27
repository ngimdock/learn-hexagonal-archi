import { Express } from "express";
import { v4 } from "uuid";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { challengeServiceFactory } from "./challengeService";
import { ValidationError } from "./validationError";
import {
  ChallengeRepository,
  challengeRepositoryFactory,
} from "./challengeRepository";

export const challengeController = (
  app: Express,
  prismaClient: PrismaClient,
  challengeRepository: ChallengeRepository
) => {
  const challengeService = challengeServiceFactory(
    prismaClient,
    challengeRepository
  );

  app.get("/", (req, res) => {
    res.sendFile("postman.json", { root: path.resolve(__dirname, "../") });
  });

  app.get("/api/challenges", async (req, res) => {
    res.json(await challengeService.getChallenges());
  });

  app.get("/api/challenges/:id", async (req, res) => {
    const id = req.params.id;

    try {
      const challenge = await challengeService.getChallenge(id);
      res.json(challenge);
    } catch (error) {
      if (error instanceof ValidationError) return res.sendStatus(4000);

      res.sendStatus(500);
    }
  });

  app.post("/api/challenges", async (req, res) => {
    const { name, content } = req.body;

    try {
      const id = await challengeService.createChallenge(name, content);

      res.json({ id });
    } catch (error) {
      if (error instanceof ValidationError) return res.sendStatus(400);

      res.sendStatus(500);
    }
  });

  app.delete("/api/challenges/:id", async (req, res) => {
    const id = req.params.id;

    try {
      await challengeService.deleteChallenge(id);

      res.sendStatus(200);
    } catch (error) {
      if (error instanceof ValidationError) return res.sendStatus(400);

      return res.sendStatus(500);
    }
  });
};
