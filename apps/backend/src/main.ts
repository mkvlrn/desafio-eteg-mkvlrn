import { serve } from "@hono/node-server";
import { getServer } from "#/server/app.ts";

serve(
  {
    fetch: getServer().fetch,
    // biome-ignore lint/style/noProcessEnv: required
    port: Number(process.env.BACKEND_PORT),
  },
  // biome-ignore lint/suspicious/noConsole: just some server info
  (info) => console.info(`up @${info.port}`),
);
