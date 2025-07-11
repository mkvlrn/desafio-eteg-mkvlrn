/** biome-ignore-all lint/suspicious/noConsole: need feedback for seed operation */

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { env } from "#domain/utils/env.ts";

const prismaPg = new PrismaPg({ connectionString: env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: prismaPg });
const rainbowColors = [
  { name: "Vermelho", hex: "#FF0000" },
  { name: "Laranja", hex: "#FF7F00" },
  { name: "Amarelo", hex: "#FFFF00" },
  { name: "Verde", hex: "#00FF00" },
  { name: "Azul", hex: "#0000FF" },
  { name: "Índigo", hex: "#4B0082" },
  { name: "Violeta", hex: "#8B00FF" },
];

try {
  for (const color of rainbowColors) {
    await prisma.color.upsert({
      where: { hex: color.hex },
      update: {},
      create: color,
    });
  }
} catch (err) {
  console.error("seed failed:", (err as Error).message);
} finally {
  await prisma.$disconnect();
}
