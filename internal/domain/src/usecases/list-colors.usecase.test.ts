import { afterAll, assert, it, vi } from "vitest";
import { validColor } from "#/__fixtures__/color.fixtures.ts";
import { mockColorRepository } from "#/__fixtures__/repositories.fixtures.ts";
import { listColorsUseCase } from "#/usecases/list-colors.usecase.ts";
import { AppError } from "#/utils/app-error.ts";
import { Result } from "#/utils/result.ts";

afterAll(() => {
  vi.resetAllMocks();
});

it("returns colors", async () => {
  vi.spyOn(mockColorRepository, "findAll").mockResolvedValue(Result.ok([validColor]));

  const result = await listColorsUseCase(mockColorRepository);

  assert.isUndefined(result.error);
  assert.deepStrictEqual(result.value, [validColor]);
});

it("returns error if repository throws", async () => {
  const repoError = new AppError("REPOSITORY_ERROR", "database exploded");
  vi.spyOn(mockColorRepository, "findAll").mockResolvedValue(Result.error(repoError));

  const result = await listColorsUseCase(mockColorRepository);

  assert.isDefined(result.error);
  assert.instanceOf(result.error, AppError);
  assert.strictEqual(result.error.name, "REPOSITORY_ERROR");
  assert.strictEqual(result.error.message, "database exploded");
});
