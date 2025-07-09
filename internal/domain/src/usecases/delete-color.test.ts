import { afterEach, assert, beforeEach, describe, it, vi } from "vitest";
import { validColor } from "#/__fixtures__/color.fixtures.ts";
import { mockColorRepository } from "#/__fixtures__/repositories.fixtures.ts";
import { DeleteColorUseCase } from "#/usecases/delete-color.ts";
import { AppError } from "#/utils/app-error.ts";
import { Result } from "#/utils/result.ts";

let usecase: DeleteColorUseCase;

beforeEach(() => {
  usecase = new DeleteColorUseCase(mockColorRepository);
});

afterEach(() => {
  vi.resetAllMocks();
});

it("deletes color", async () => {
  vi.spyOn(mockColorRepository, "findById").mockResolvedValue(Result.ok(validColor));
  vi.spyOn(mockColorRepository, "delete").mockResolvedValue(Result.ok(undefined));

  const result = await usecase.execute(validColor.id);

  assert.isUndefined(result.error);
  assert.isUndefined(result.value);
});

it("returns error if color is not registered", async () => {
  vi.spyOn(mockColorRepository, "findById").mockResolvedValue(Result.ok(undefined));

  const result = await usecase.execute(validColor.id);

  assert.isDefined(result.error);
  assert.instanceOf(result.error, AppError);
  assert.strictEqual(result.error.name, "INEXISTENT");
  assert.strictEqual(result.error.message, `color with id '${validColor.id}' not registered`);
});

describe("returns error if repository throws", () => {
  it("when checking if color exists", async () => {
    const repoError = new AppError("REPOSITORY_ERROR", "database exploded");
    vi.spyOn(mockColorRepository, "findById").mockResolvedValue(Result.error(repoError));

    const result = await usecase.execute(validColor.id);

    assert.isDefined(result.error);
    assert.instanceOf(result.error, AppError);
    assert.strictEqual(result.error.name, "REPOSITORY_ERROR");
    assert.strictEqual(result.error.message, "database exploded");
  });

  it("when deleting color", async () => {
    vi.spyOn(mockColorRepository, "findById").mockResolvedValue(Result.ok(validColor));
    const repoError = new AppError("REPOSITORY_ERROR", "database exploded");
    vi.spyOn(mockColorRepository, "delete").mockResolvedValue(Result.error(repoError));

    const result = await usecase.execute(validColor.id);

    assert.isDefined(result.error);
    assert.instanceOf(result.error, AppError);
    assert.strictEqual(result.error.name, "REPOSITORY_ERROR");
    assert.strictEqual(result.error.message, "database exploded");
  });
});
