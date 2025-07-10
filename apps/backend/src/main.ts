import { serve } from "@hono/node-server";
import { getServer } from "#/server/app.ts";
import { PrismaClient } from "#prisma/index.js";

const prisma = new PrismaClient();
await prisma.$connect(); // https://github.com/prisma/prisma/issues/18813

serve(
  {
    fetch: getServer(prisma).fetch,
    // biome-ignore lint/style/noProcessEnv: required
    port: Number(process.env.BACKEND_PORT),
  },
  // biome-ignore lint/suspicious/noConsole: just some server info
  (info) => console.info(`up @${info.port}`),
);
