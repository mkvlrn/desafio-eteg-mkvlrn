import type { ColorDto } from "#/models/color.ts";
import type { ColorRepository } from "#/repositories/color.repository.ts";
import { Result } from "#/utils/result.ts";

export async function listColorsUseCase(repo: ColorRepository): Promise<Result<ColorDto[]>> {
  const result = await repo.findAll();

  return result.error ? Result.error(result.error) : Result.ok(result.value);
}
