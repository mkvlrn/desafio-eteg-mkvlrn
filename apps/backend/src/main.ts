import { serve } from "@hono/node-server";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { getServer } from "#/server/app.ts";

const prismaPg = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: prismaPg });

serve(
  {
    fetch: getServer(prisma).fetch,
    // biome-ignore lint/style/noProcessEnv: required
    port: Number(process.env.BACKEND_PORT),
  },
  // biome-ignore lint/suspicious/noConsole: just some server info
  (info) => console.info(`up @${info.port}`),
);
