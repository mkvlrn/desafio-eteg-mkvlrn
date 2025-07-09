import { afterEach, assert, beforeEach, describe, it, vi } from "vitest";
import { validCreateCustomer, validCustomer } from "#/__fixtures__/customer.fixtures.ts";
import { mockCustomerRepository } from "#/__fixtures__/repositories.fixtures.ts";
import { AddCustomerUseCase } from "#/usecases/add-customer.ts";
import { AppError } from "#/utils/app-error.ts";
import { Result } from "#/utils/result.ts";

let usecase: AddCustomerUseCase;

beforeEach(() => {
  usecase = new AddCustomerUseCase(mockCustomerRepository);
});

afterEach(() => {
  vi.resetAllMocks();
});

it("creates a new customer", async () => {
  vi.spyOn(mockCustomerRepository, "findByCpf").mockResolvedValue(Result.ok(null));
  vi.spyOn(mockCustomerRepository, "findByEmail").mockResolvedValue(Result.ok(null));
  vi.spyOn(mockCustomerRepository, "create").mockResolvedValue(Result.ok(validCustomer));

  const result = await usecase.execute(validCreateCustomer);

  assert.isNull(result.error);
  assert.deepStrictEqual(result.value, validCustomer);
});

describe("returns error if customer is not unique", () => {
  it("CPF", async () => {
    vi.spyOn(mockCustomerRepository, "findByCpf").mockResolvedValue(Result.ok(validCustomer));

    const result = await usecase.execute(validCreateCustomer);

    assert.isDefined(result.error);
    assert.instanceOf(result.error, AppError);
    assert.strictEqual(result.error.name, "NOT_UNIQUE");
    assert.strictEqual(
      result.error.message,
      `customer with cpf '${validCreateCustomer.cpf}' already registered`,
    );
  });

  it("email", async () => {
    vi.spyOn(mockCustomerRepository, "findByCpf").mockResolvedValue(Result.ok(null));
    vi.spyOn(mockCustomerRepository, "findByEmail").mockResolvedValue(Result.ok(validCustomer));

    const result = await usecase.execute(validCreateCustomer);

    assert.isDefined(result.error);
    assert.instanceOf(result.error, AppError);
    assert.strictEqual(result.error.name, "NOT_UNIQUE");
    assert.strictEqual(
      result.error.message,
      `customer with email '${validCreateCustomer.email}' already registered`,
    );
  });
});

describe("returns error if repository throws", () => {
  it("when checking for unique cpf", async () => {
    const repoError = new AppError("REPOSITORY_ERROR", "database exploded");
    vi.spyOn(mockCustomerRepository, "findByCpf").mockResolvedValue(Result.error(repoError));

    const result = await usecase.execute(validCreateCustomer);

    assert.isDefined(result.error);
    assert.instanceOf(result.error, AppError);
    assert.strictEqual(result.error.name, "REPOSITORY_ERROR");
    assert.strictEqual(result.error.message, "database exploded");
  });

  it("when checking for unique email", async () => {
    const repoError = new AppError("REPOSITORY_ERROR", "database exploded");
    vi.spyOn(mockCustomerRepository, "findByCpf").mockResolvedValue(Result.ok(null));
    vi.spyOn(mockCustomerRepository, "findByEmail").mockResolvedValue(Result.error(repoError));

    const result = await usecase.execute(validCreateCustomer);

    assert.isDefined(result.error);
    assert.instanceOf(result.error, AppError);
    assert.strictEqual(result.error.name, "REPOSITORY_ERROR");
    assert.strictEqual(result.error.message, "database exploded");
  });

  it("when persisting new customer", async () => {
    vi.spyOn(mockCustomerRepository, "findByCpf").mockResolvedValue(Result.ok(null));
    vi.spyOn(mockCustomerRepository, "findByEmail").mockResolvedValue(Result.ok(null));
    const repoError = new AppError("REPOSITORY_ERROR", "database exploded");
    vi.spyOn(mockCustomerRepository, "create").mockResolvedValue(Result.error(repoError));

    const result = await usecase.execute(validCreateCustomer);

    assert.isDefined(result.error);
    assert.instanceOf(result.error, AppError);
    assert.strictEqual(result.error.name, "REPOSITORY_ERROR");
    assert.strictEqual(result.error.message, "database exploded");
  });
});
