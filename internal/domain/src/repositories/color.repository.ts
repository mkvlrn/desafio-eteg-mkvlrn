import type { ColorDto, CreateColorDto } from "#/models/color.ts";
import type { Result } from "#/utils/result.ts";

export interface ColorRepository {
  create(input: CreateColorDto): Promise<Result<ColorDto>>;
  findById(id: string): Promise<Result<ColorDto | undefined>>;
  findByName(name: string): Promise<Result<ColorDto | undefined>>;
  delete(id: string): Promise<Result<void>>;
}
