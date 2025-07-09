import type { CreateCustomerDto, CustomerDto } from "#/models/customer.ts";
import type { Result } from "#/utils/result.ts";

export interface CustomerRepository {
  create(input: CreateCustomerDto): Promise<Result<CustomerDto>>;
  findAll(): Promise<Result<CustomerDto[]>>;
  findById(id: string): Promise<Result<CustomerDto | undefined>>;
  findByEmail(email: string): Promise<Result<CustomerDto | undefined>>;
  findByCpf(cpf: string): Promise<Result<CustomerDto | undefined>>;
  delete(id: string): Promise<Result<void>>;
}
