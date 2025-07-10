import type { ColorDto, CreateColorDto } from "../models/color.ts";
import type { ColorRepository } from "../repositories/color.repository.ts";
import { AppError } from "../utils/app-error.ts";
import { Result } from "../utils/result.ts";

export class AddColorUseCase {
  private readonly repository: ColorRepository;

  constructor(repo: ColorRepository) {
    this.repository = repo;
  }

  async execute(input: CreateColorDto): Promise<Result<ColorDto>> {
    const isUnique = await this.isColorUnique(input);
    if (isUnique.error) {
      return Result.error(isUnique.error);
    }

    const newColor = await this.repository.create(input);
    if (newColor.error) {
      return Result.error(new AppError("REPOSITORY_ERROR", newColor.error.message));
    }

    return Result.ok(newColor.value);
  }

  private async isColorUnique(input: CreateColorDto): Promise<Result<undefined>> {
    const nameExists = await this.repository.findByName(input.name);
    if (nameExists.error) {
      return Result.error(new AppError("REPOSITORY_ERROR", nameExists.error.message));
    }
    if (nameExists.value) {
      return Result.error(new AppError("NOT_UNIQUE", `cor com nome '${input.name}' já existe`));
    }

    return Result.ok(undefined);
  }
}
