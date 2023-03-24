import { PrismaClient } from "@prisma/client";
import express from "express";
import { v4 } from "uuid";

export const App = () => {
  const app = express();

  app.use(express.json());

  const prismaClient = new PrismaClient();

  app.get("/", (req, res) => {
    res.sendStatus(200);
  });

  app.get("/api/challenges", async (req, res) => {
    res.json(await prismaClient.challangeRow.findMany());
  });

  app.get("/api/challenges/:id", async (req, res) => {
    const id = req.params.id;

    const challenge = await prismaClient.challangeRow.findUnique({
      where: { id },
    });

    if (!challenge) return res.sendStatus(400);

    res.json(challenge);
  });

  app.post("/api/challenges", async (req, res) => {
    const { name, content } = req.body;

    if (typeof name !== "string" || typeof content !== "string") {
      return res.sendStatus(400);
    }

    const level = 1;

    await prismaClient.challangeRow.create({
      data: { id: v4(), name, content, level },
    });

    res.sendStatus(200);
  });

  app.delete("/api/challenges/:id", async (req, res) => {
    const id = req.params.id;

    if (typeof id !== "string") return res.sendStatus(400);

    await prismaClient.challangeRow.delete({ where: { id } });
    res.sendStatus(200);
  });

  return app;
};
