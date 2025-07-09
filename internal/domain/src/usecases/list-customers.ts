import type { CustomerDto } from "../models/customer.ts";
import type { CustomerRepository } from "../repositories/customer.repository.ts";
import { Result } from "../utils/result.ts";

export class ListCustomersUseCase {
  private readonly repository: CustomerRepository;

  constructor(repo: CustomerRepository) {
    this.repository = repo;
  }

  async execute(): Promise<Result<CustomerDto[]>> {
    const result = await this.repository.findAll();

    if (result.error) {
      return Result.error(result.error);
    }

    return Result.ok(result.value);
  }
}
