import { Hono } from "hono";

export function getServer(): Hono {
  const app = new Hono();

  return app;
}
