import { serve } from "@hono/node-server";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { getServer } from "#/server/app.ts";
import { env } from "#domain/utils/env.ts";

const prismaPg = new PrismaPg({ connectionString: env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: prismaPg });

serve(
  {
    fetch: getServer(prisma).fetch,
    port: Number(env.BACKEND_PORT),
    hostname: "0.0.0.0",
  },
  // biome-ignore lint/suspicious/noConsole: just some server info
  (info) => console.info(`up @${info.port}`),
);
