import { afterEach, assert, beforeEach, describe, it, vi } from "vitest";
import { validCustomer } from "../__fixtures__/customer.fixtures.ts";
import { mockCustomerRepository } from "../__fixtures__/repositories.fixtures.ts";
import { DeleteCustomerUseCase } from "../usecases/delete-customer.ts";
import { AppError } from "../utils/app-error.ts";
import { Result } from "../utils/result.ts";

let usecase: DeleteCustomerUseCase;

beforeEach(() => {
  usecase = new DeleteCustomerUseCase(mockCustomerRepository);
});

afterEach(() => {
  vi.resetAllMocks();
});

it("deletes customer", async () => {
  vi.spyOn(mockCustomerRepository, "findById").mockResolvedValue(Result.ok(validCustomer));
  vi.spyOn(mockCustomerRepository, "delete").mockResolvedValue(Result.ok(undefined));

  const result = await usecase.execute(validCustomer.id);

  assert.isNull(result.error);
  assert.isUndefined(result.value);
});

it("returns error if customer is not registered", async () => {
  vi.spyOn(mockCustomerRepository, "findById").mockResolvedValue(Result.ok(null));

  const result = await usecase.execute(validCustomer.id);

  assert.isDefined(result.error);
  assert.instanceOf(result.error, AppError);
  assert.strictEqual(result.error.name, "INEXISTENT");
  assert.strictEqual(result.error.message, `customer with id '${validCustomer.id}' not registered`);
});

describe("returns error if repository throws", () => {
  it("when checking if customer exists", async () => {
    const repoError = new AppError("REPOSITORY_ERROR", "database exploded");
    vi.spyOn(mockCustomerRepository, "findById").mockResolvedValue(Result.error(repoError));

    const result = await usecase.execute(validCustomer.id);

    assert.isDefined(result.error);
    assert.instanceOf(result.error, AppError);
    assert.strictEqual(result.error.name, "REPOSITORY_ERROR");
    assert.strictEqual(result.error.message, "database exploded");
  });

  it("when deleting customer", async () => {
    vi.spyOn(mockCustomerRepository, "findById").mockResolvedValue(Result.ok(validCustomer));
    const repoError = new AppError("REPOSITORY_ERROR", "database exploded");
    vi.spyOn(mockCustomerRepository, "delete").mockResolvedValue(Result.error(repoError));

    const result = await usecase.execute(validCustomer.id);

    assert.isDefined(result.error);
    assert.instanceOf(result.error, AppError);
    assert.strictEqual(result.error.name, "REPOSITORY_ERROR");
    assert.strictEqual(result.error.message, "database exploded");
  });
});
