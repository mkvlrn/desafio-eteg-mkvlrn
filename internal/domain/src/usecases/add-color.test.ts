import { afterEach, assert, beforeEach, describe, it, vi } from "vitest";
import { validColor, validCreateColor } from "#/__fixtures__/color.fixtures.ts";
import { mockColorRepository } from "#/__fixtures__/repositories.fixtures.ts";
import { AddColorUseCase } from "#/usecases/add-color.ts";
import { AppError } from "#/utils/app-error.ts";
import { Result } from "#/utils/result.ts";

let usecase: AddColorUseCase;

beforeEach(() => {
  usecase = new AddColorUseCase(mockColorRepository);
});

afterEach(() => {
  vi.resetAllMocks();
});

it("creates a new color", async () => {
  vi.spyOn(mockColorRepository, "findByName").mockResolvedValue(Result.ok(undefined));
  vi.spyOn(mockColorRepository, "create").mockResolvedValue(Result.ok(validColor));

  const result = await usecase.execute(validCreateColor);

  assert.isUndefined(result.error);
  assert.deepStrictEqual(result.value, validColor);
});

it("returns error if color name is not unique", async () => {
  vi.spyOn(mockColorRepository, "findByName").mockResolvedValue(Result.ok(validColor));

  const result = await usecase.execute(validCreateColor);

  assert.isDefined(result.error);
  assert.instanceOf(result.error, AppError);
  assert.strictEqual(result.error.name, "NOT_UNIQUE");
  assert.strictEqual(
    result.error.message,
    `color with name '${validCreateColor.name}' already registered`,
  );
});

describe("returns error if repository throws", () => {
  it("when checking for unique color name", async () => {
    const repoError = new AppError("REPOSITORY_ERROR", "database exploded");
    vi.spyOn(mockColorRepository, "findByName").mockResolvedValue(Result.error(repoError));

    const result = await usecase.execute(validCreateColor);

    assert.isDefined(result.error);
    assert.instanceOf(result.error, AppError);
    assert.strictEqual(result.error.name, "REPOSITORY_ERROR");
    assert.strictEqual(result.error.message, "database exploded");
  });

  it("when persisting new color", async () => {
    vi.spyOn(mockColorRepository, "findByName").mockResolvedValue(Result.ok(undefined));
    const repoError = new AppError("REPOSITORY_ERROR", "database exploded");
    vi.spyOn(mockColorRepository, "create").mockResolvedValue(Result.error(repoError));

    const result = await usecase.execute(validCreateColor);

    assert.isDefined(result.error);
    assert.instanceOf(result.error, AppError);
    assert.strictEqual(result.error.name, "REPOSITORY_ERROR");
    assert.strictEqual(result.error.message, "database exploded");
  });
});
