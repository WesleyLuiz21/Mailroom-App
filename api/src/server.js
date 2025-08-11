import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Health check
app.get("/health", (req, res) => res.json({ ok: true }));

// List parcels
app.get("/parcels", async (req, res) => {
  const parcels = await prisma.parcel.findMany();
  res.json(parcels);
});

// Add parcel
app.post("/parcels", async (req, res) => {
  const { recipient } = req.body;
  const parcel = await prisma.parcel.create({
    data: { recipient }
  });
  res.json(parcel);
});

app.listen(4000, () => console.log("API running on http://localhost:4000"));
