import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { getColorsRouter } from "#/routers/colors.router.ts";
import { getCustomersRouter } from "#/routers/customers.router.ts";
import type { PrismaClient } from "#prisma/index.js";

export function getServer(prisma: PrismaClient): Hono {
  const app = new Hono();
  app.onError((err, ctx) => {
    if (err instanceof HTTPException) {
      return err.getResponse();
    }

    return ctx.json({ error: "ISE" }, 500);
  });

  app.route("/colors", getColorsRouter(prisma));
  app.route("/customers", getCustomersRouter(prisma));

  return app;
}
