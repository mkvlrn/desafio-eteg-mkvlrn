import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";
import { assert, it } from "vitest";
import { getServer } from "#/server/app.ts";

it("generates the main server", () => {
  const server = getServer(new PrismaClient());

  assert.isDefined(server);
  assert.instanceOf(server, Hono);
});
