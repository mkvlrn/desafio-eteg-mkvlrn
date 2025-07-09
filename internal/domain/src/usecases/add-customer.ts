import type { CreateCustomerDto, CustomerDto } from "../models/customer.ts";
import type { CustomerRepository } from "../repositories/customer.repository.ts";
import { AppError } from "../utils/app-error.ts";
import { Result } from "../utils/result.ts";

export class AddCustomerUseCase {
  private readonly repository: CustomerRepository;

  constructor(repo: CustomerRepository) {
    this.repository = repo;
  }

  async execute(input: CreateCustomerDto): Promise<Result<CustomerDto>> {
    const isUnique = await this.isCustomerUnique(input);
    if (isUnique.error) {
      return Result.error(isUnique.error);
    }

    const newCustomer = await this.repository.create(input);
    if (newCustomer.error) {
      return Result.error(new AppError("REPOSITORY_ERROR", newCustomer.error.message));
    }

    return Result.ok(newCustomer.value);
  }

  private async isCustomerUnique(input: CreateCustomerDto): Promise<Result<undefined>> {
    const cpfExists = await this.repository.findByCpf(input.cpf);
    if (cpfExists.error) {
      return Result.error(new AppError("REPOSITORY_ERROR", cpfExists.error.message));
    }
    if (cpfExists.value) {
      return Result.error(
        new AppError("NOT_UNIQUE", `customer with cpf '${input.cpf}' already registered`),
      );
    }

    const emailExists = await this.repository.findByEmail(input.email);
    if (emailExists.error) {
      return Result.error(new AppError("REPOSITORY_ERROR", emailExists.error.message));
    }
    if (emailExists.value) {
      return Result.error(
        new AppError("NOT_UNIQUE", `customer with email '${input.email}' already registered`),
      );
    }

    return Result.ok(undefined);
  }
}
