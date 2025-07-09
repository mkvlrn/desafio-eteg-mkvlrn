/** biome-ignore-all lint/style/noProcessEnv: fine for test files */

import { execSync } from "node:child_process";
import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { afterAll, assert, beforeAll, describe, expect, it } from "vitest";
import { PrismaColorRepository } from "#/infra/color.prisma-repo.ts";
import { PrismaClient } from "#prisma/index.js";

describe("prisma color repository", () => {
  let db: StartedPostgreSqlContainer;
  let prisma: PrismaClient;
  let repo: PrismaColorRepository;
  let deleteId: string;

  beforeAll(async () => {
    db = await new PostgreSqlContainer("postgres:latest").start();
    prisma = new PrismaClient({
      datasourceUrl: db.getConnectionUri(),
    });
    execSync("prisma migrate deploy", {
      // biome-ignore lint/style/useNamingConvention: fine for test files
      env: { ...process.env, DATABASE_URL: db.getConnectionUri() },
    });
    repo = new PrismaColorRepository(prisma);
  }, 30000);

  afterAll(async () => {
    await db.stop();
  });

  it("creates a new color", { timeout: 60000 }, async () => {
    const result = await repo.create({ name: "red", hex: "#f00" });

    assert.isNull(result.error);
    assert.isDefined(result.value);
    expect(result.value).toEqual(
      expect.objectContaining({
        // biome-ignore lint/performance/useTopLevelRegex: overzealous
        id: expect.stringMatching(/.+/),
        name: "red",
        hex: "#f00",
      }),
    );

    deleteId = result.value.id;
  });

  it("creates a second color", { timeout: 60000 }, async () => {
    const result = await repo.create({ name: "green", hex: "#0f0" });

    assert.isNull(result.error);
    assert.isDefined(result.value);
    expect(result.value).toEqual(
      expect.objectContaining({
        // biome-ignore lint/performance/useTopLevelRegex: overzealous
        id: expect.stringMatching(/.+/),
        name: "green",
        hex: "#0f0",
      }),
    );
  });

  it("lists registered colors", { timeout: 60000 }, async () => {
    const result = await repo.findAll();

    assert.isNull(result.error);
    assert.isDefined(result.value);
    assert.lengthOf(result.value, 2);
    expect(result.value).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          // biome-ignore lint/performance/useTopLevelRegex: overzealous
          id: expect.stringMatching(/.+/),
          name: "red",
          hex: "#f00",
        }),
        expect.objectContaining({
          // biome-ignore lint/performance/useTopLevelRegex: overzealous
          id: expect.stringMatching(/.+/),
          name: "green",
          hex: "#0f0",
        }),
      ]),
    );
  });

  it("finds color by id", { timeout: 60000 }, async () => {
    const result = await repo.findById(deleteId);

    assert.isNull(result.error);
    assert.isDefined(result.value);
    expect(result.value).toEqual(
      expect.objectContaining({
        // biome-ignore lint/performance/useTopLevelRegex: overzealous
        id: expect.stringMatching(/.+/),
        name: "red",
        hex: "#f00",
      }),
    );
  });

  it("finds color by name", { timeout: 60000 }, async () => {
    const result = await repo.findByName("red");

    assert.isNull(result.error);
    assert.isDefined(result.value);
    expect(result.value).toEqual(
      expect.objectContaining({
        // biome-ignore lint/performance/useTopLevelRegex: overzealous
        id: expect.stringMatching(/.+/),
        name: "red",
        hex: "#f00",
      }),
    );
  });

  it("deletes a color by id", { timeout: 60000 }, async () => {
    const result = await repo.delete(deleteId);

    assert.isNull(result.error);
  });
});
