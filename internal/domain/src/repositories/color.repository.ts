import type { ColorDto, CreateColorDto } from "#/models/color.ts";
import type { Result } from "#/utils/result.ts";

export interface ColorRepository {
  create(input: CreateColorDto): Promise<Result<ColorDto>>;
  findAll(): Promise<Result<ColorDto[]>>;
  findById(id: string): Promise<Result<ColorDto | null>>;
  findByName(name: string): Promise<Result<ColorDto | null>>;
  delete(id: string): Promise<Result<void>>;
}
