import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";
import { assert, it } from "vitest";
import { getServer } from "#/server/app.ts";

it("generates the main server", () => {
  const prismaPg = new PrismaPg({ connectionString: "" });
  const server = getServer(new PrismaClient({ adapter: prismaPg }));

  assert.isDefined(server);
  assert.instanceOf(server, Hono);
});
