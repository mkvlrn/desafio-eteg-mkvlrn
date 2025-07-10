/** biome-ignore-all lint/suspicious/noConsole: need feedback for seed operation */

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { env } from "#domain/utils/env.ts";

const prismaPg = new PrismaPg({ connectionString: env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: prismaPg });
const rainbowColors = [
  { name: "Red", hex: "#FF0000" },
  { name: "Orange", hex: "#FF7F00" },
  { name: "Yellow", hex: "#FFFF00" },
  { name: "Green", hex: "#00FF00" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Indigo", hex: "#4B0082" },
  { name: "Violet", hex: "#8B00FF" },
];

try {
  await prisma.color.createMany({
    data: rainbowColors,
  });
} catch (err) {
  console.error("seed failed:", (err as Error).message);
} finally {
  await prisma.$disconnect();
}
