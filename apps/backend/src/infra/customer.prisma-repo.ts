import type { CreateCustomerDto, CustomerDto } from "#domain/models/customer.ts";
import type { CustomerRepository } from "#domain/repositories/customer.repository.ts";
import { AppError } from "#domain/utils/app-error.ts";
import { Result } from "#domain/utils/result.ts";
import type { PrismaClient } from "#prisma/index.js";

export class PrismaCustomerRepository implements CustomerRepository {
  private readonly prisma: PrismaClient;

  constructor(client: PrismaClient) {
    this.prisma = client;
  }

  async create(input: CreateCustomerDto): Promise<Result<CustomerDto, AppError>> {
    const { name, cpf, email, favoriteColor } = input;

    try {
      const created = await this.prisma.customer.create({
        data: {
          name,
          cpf,
          email,
          favoriteColor,
        },
      });
      return Result.ok(created);
    } catch (err) {
      const appError = new AppError("GENERIC_ERROR", (err as Error).message);
      return Result.error(appError);
    }
  }

  async findAll(): Promise<Result<CustomerDto[], AppError>> {
    try {
      const colors = await this.prisma.customer.findMany();
      return Result.ok(colors);
    } catch (err) {
      const appError = new AppError("GENERIC_ERROR", (err as Error).message);
      return Result.error(appError);
    }
  }

  async findById(id: string): Promise<Result<CustomerDto | null, AppError>> {
    try {
      const result = await this.prisma.customer.findUnique({
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

  async findByEmail(email: string): Promise<Result<CustomerDto | null, AppError>> {
    try {
      const result = await this.prisma.customer.findUnique({
        where: {
          email,
        },
      });
      return Result.ok(result);
    } catch (err) {
      const appError = new AppError("GENERIC_ERROR", (err as Error).message);
      return Result.error(appError);
    }
  }

  async findByCpf(cpf: string): Promise<Result<CustomerDto | null, AppError>> {
    try {
      const result = await this.prisma.customer.findUnique({
        where: {
          cpf,
        },
      });
      return Result.ok(result);
    } catch (err) {
      const appError = new AppError("GENERIC_ERROR", (err as Error).message);
      console.log(err);

      return Result.error(appError);
    }
  }

  async delete(id: string): Promise<Result<void, AppError>> {
    try {
      await this.prisma.customer.delete({
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
