import { PrismaClient } from "@prisma/client";
import express from "express";
import { challengeController } from "./challengeController";

export const appFactory = () => {
  const app = express();

  app.use(express.json());

  const prismaClient = new PrismaClient();

  app.head("/status", (req, res) => {
    res.sendStatus(200);
  });

  challengeController(app, prismaClient);

  return app;
};
