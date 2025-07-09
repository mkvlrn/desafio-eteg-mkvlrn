import type { CreateCustomerDto, CustomerDto } from "#/models/customer.ts";
import type { Result } from "#/utils/result.ts";

export interface CustomerRepository {
  create(input: CreateCustomerDto): Promise<Result<CustomerDto>>;
  findAll(): Promise<Result<CustomerDto[]>>;
  findById(id: string): Promise<Result<CustomerDto | null>>;
  findByEmail(email: string): Promise<Result<CustomerDto | null>>;
  findByCpf(cpf: string): Promise<Result<CustomerDto | null>>;
  delete(id: string): Promise<Result<void>>;
}
