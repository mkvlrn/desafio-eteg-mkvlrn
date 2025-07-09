import type { ColorDto } from "../models/color.ts";
import type { ColorRepository } from "../repositories/color.repository.ts";
import { Result } from "../utils/result.ts";

export class ListColorsUseCase {
  private readonly repository: ColorRepository;

  constructor(repo: ColorRepository) {
    this.repository = repo;
  }

  async execute(): Promise<Result<ColorDto[]>> {
    const result = await this.repository.findAll();

    if (result.error) {
      return Result.error(result.error);
    }

    return Result.ok(result.value);
  }
}
