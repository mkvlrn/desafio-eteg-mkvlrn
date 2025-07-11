/** biome-ignore-all lint/style/noProcessEnv: fine for test files */

import { execSync } from "node:child_process";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { afterAll, assert, beforeAll, describe, expect, it } from "vitest";
import { PrismaCustomerRepository } from "#/infra/customer.prisma-repo.ts";

describe("prisma customer repository", () => {
  let db: StartedPostgreSqlContainer;
  let prisma: PrismaClient;
  let repo: PrismaCustomerRepository;
  let colorId: string;
  let colorHex: string;
  let deleteId: string;

  beforeAll(async () => {
    db = await new PostgreSqlContainer("postgres:latest").start();
    const prismaPg = new PrismaPg({ connectionString: db.getConnectionUri() });
    prisma = new PrismaClient({ adapter: prismaPg });
    execSync("prisma migrate deploy", {
      // biome-ignore lint/style/useNamingConvention: fine for test files
      env: { ...process.env, DATABASE_URL: db.getConnectionUri() },
    });
    execSync("prisma db seed", {
      // biome-ignore lint/style/useNamingConvention: fine for test files
      env: { ...process.env, BACKEND_PORT: "5000", DATABASE_URL: db.getConnectionUri() },
    });
    const firstColor = await prisma.color.findFirst();
    if (firstColor) {
      colorId = firstColor.id;
      colorHex = firstColor.hex;
    }
    repo = new PrismaCustomerRepository(prisma);
  }, 30000);

  afterAll(async () => {
    await prisma.$disconnect();
    await db.stop();
  });

  it("creates a new customer", { timeout: 60000 }, async () => {
    const result = await repo.create({
      name: "John Doe",
      cpf: "22552447058",
      email: "john@email.com",
      favoriteColor: colorId,
    });

    assert.isNull(result.error);
    assert.isDefined(result.value);
    expect(result.value).toEqual(
      expect.objectContaining({
        // biome-ignore lint/performance/useTopLevelRegex: overzealous
        id: expect.stringMatching(/.+/),
        name: "John Doe",
        cpf: "22552447058",
        email: "john@email.com",
        favoriteColor: colorId,
      }),
    );

    deleteId = result.value.id;
  });

  it("creates a second customer", { timeout: 60000 }, async () => {
    const result = await repo.create({
      name: "Jane Doe",
      cpf: "81536098078",
      email: "jame@email.com",
      favoriteColor: colorId,
    });

    assert.isNull(result.error);
    assert.isDefined(result.value);
    expect(result.value).toEqual(
      expect.objectContaining({
        // biome-ignore lint/performance/useTopLevelRegex: overzealous
        id: expect.stringMatching(/.+/),
        name: "Jane Doe",
        cpf: "81536098078",
        email: "jame@email.com",
        favoriteColor: colorId,
      }),
    );
  });

  it("lists registered customers", { timeout: 60000 }, async () => {
    const result = await repo.findAll();

    assert.isNull(result.error);
    assert.isDefined(result.value);
    assert.lengthOf(result.value, 2);
    expect(result.value).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          // biome-ignore lint/performance/useTopLevelRegex: overzealous
          id: expect.stringMatching(/.+/),
          name: "John Doe",
          cpf: "22552447058",
          email: "john@email.com",
          favoriteColor: colorHex,
        }),
        expect.objectContaining({
          // biome-ignore lint/performance/useTopLevelRegex: overzealous
          id: expect.stringMatching(/.+/),
          name: "Jane Doe",
          cpf: "81536098078",
          email: "jame@email.com",
          favoriteColor: colorHex,
        }),
      ]),
    );
  });

  it("finds customer by id", { timeout: 60000 }, async () => {
    const result = await repo.findById(deleteId);

    assert.isNull(result.error);
    assert.isDefined(result.value);
    expect(result.value).toEqual(
      expect.objectContaining({
        // biome-ignore lint/performance/useTopLevelRegex: overzealous
        id: expect.stringMatching(/.+/),
        name: "John Doe",
        cpf: "22552447058",
        email: "john@email.com",
        favoriteColor: colorId,
      }),
    );
  });

  it("finds customer by email", { timeout: 60000 }, async () => {
    const result = await repo.findByEmail("john@email.com");

    assert.isNull(result.error);
    assert.isDefined(result.value);
    expect(result.value).toEqual(
      expect.objectContaining({
        // biome-ignore lint/performance/useTopLevelRegex: overzealous
        id: expect.stringMatching(/.+/),
        name: "John Doe",
        cpf: "22552447058",
        email: "john@email.com",
        favoriteColor: colorId,
      }),
    );
  });

  it("finds customer by cpf", { timeout: 60000 }, async () => {
    const result = await repo.findByCpf("22552447058");

    assert.isNull(result.error);
    assert.isDefined(result.value);
    expect(result.value).toEqual(
      expect.objectContaining({
        // biome-ignore lint/performance/useTopLevelRegex: overzealous
        id: expect.stringMatching(/.+/),
        name: "John Doe",
        cpf: "22552447058",
        email: "john@email.com",
        favoriteColor: colorId,
      }),
    );
  });

  it("deletes a customer by id", { timeout: 60000 }, async () => {
    const result = await repo.delete(deleteId);

    assert.isNull(result.error);
  });
});
