import type { ColorRepository } from "#/repositories/color.repository.ts";
import { AppError } from "#/utils/app-error.ts";
import { Result } from "#/utils/result.ts";

export class DeleteColorUseCase {
  private readonly repository: ColorRepository;

  constructor(repo: ColorRepository) {
    this.repository = repo;
  }

  async execute(id: string): Promise<Result<undefined>> {
    const exists = await this.checkIfExists(id);
    if (exists.error) {
      return Result.error(exists.error);
    }

    const result = await this.repository.delete(id);
    if (result.error) {
      return Result.error(new AppError("REPOSITORY_ERROR", result.error.message));
    }

    return Result.ok(undefined);
  }

  private async checkIfExists(id: string): Promise<Result<undefined>> {
    const exists = await this.repository.findById(id);
    if (exists.error) {
      return Result.error(new AppError("REPOSITORY_ERROR", exists.error.message));
    }
    if (!exists.value) {
      return Result.error(new AppError("INEXISTENT", `color with id '${id}' not registered`));
    }

    return Result.ok(undefined);
  }
}
