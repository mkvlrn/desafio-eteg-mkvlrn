import type { ColorDto, CreateColorDto } from "#domain/models/color.ts";
import type { ColorRepository } from "#domain/repositories/color.repository.ts";
import { AppError } from "#domain/utils/app-error.ts";
import { Result } from "#domain/utils/result.ts";
import type { PrismaClient } from "#prisma/index.js";

export class PrismaColorRepository implements ColorRepository {
  private readonly prisma: PrismaClient;

  constructor(client: PrismaClient) {
    this.prisma = client;
  }

  async create(input: CreateColorDto): Promise<Result<ColorDto, AppError>> {
    const { name, hex } = input;

    try {
      const created = await this.prisma.color.create({
        data: {
          name,
          hex: hex ?? null,
        },
      });
      return Result.ok(created);
    } catch (err) {
      const appError = new AppError("GENERIC_ERROR", (err as Error).message);
      return Result.error(appError);
    }
  }

  async findAll(): Promise<Result<ColorDto[], AppError>> {
    try {
      const colors = await this.prisma.color.findMany();
      return Result.ok(colors);
    } catch (err) {
      const appError = new AppError("GENERIC_ERROR", (err as Error).message);
      return Result.error(appError);
    }
  }

  async findById(id: string): Promise<Result<ColorDto | null, AppError>> {
    try {
      const result = await this.prisma.color.findUnique({
        where: {
          id,
        },
      });
      return Result.ok(result);
    } catch (err) {
      const appError = new AppError("GENERIC_ERROR", (err as Error).message);
      return Result.error(appError);
    }
  }

  async findByName(name: string): Promise<Result<ColorDto | null, AppError>> {
    try {
      const result = await this.prisma.color.findUnique({
        where: {
          name,
        },
      });
      return Result.ok(result);
    } catch (err) {
      const appError = new AppError("GENERIC_ERROR", (err as Error).message);
      return Result.error(appError);
    }
  }

  async delete(id: string): Promise<Result<void, AppError>> {
    try {
      await this.prisma.color.findUnique({
        where: {
          id,
        },
      });
      return Result.ok(undefined);
    } catch (err) {
      const appError = new AppError("GENERIC_ERROR", (err as Error).message);
      return Result.error(appError);
    }
  }
}
