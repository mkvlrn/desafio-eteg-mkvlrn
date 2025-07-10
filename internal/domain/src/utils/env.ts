/** biome-ignore-all lint/style/useNamingConvention: bunch of ALL_CAPS vars */

import { z } from "zod/v4";

const env = z
  .object({
    NODE_ENV: z.enum(["development", "production", "test"]),
    DATABASE_URL: z.url(),
    BACKEND_PORT: z.string(),
  })
  // biome-ignore lint/style/noProcessEnv: centralized here
  .parse(process.env);

export { env };
