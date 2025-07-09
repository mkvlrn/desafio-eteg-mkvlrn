import { afterEach, assert, beforeEach, it, vi } from "vitest";
import { validCustomer } from "../__fixtures__/customer.fixtures.ts";
import { mockCustomerRepository } from "../__fixtures__/repositories.fixtures.ts";
import { ListCustomersUseCase } from "../usecases/list-customers.ts";
import { AppError } from "../utils/app-error.ts";
import { Result } from "../utils/result.ts";

let usecase: ListCustomersUseCase;

beforeEach(() => {
  usecase = new ListCustomersUseCase(mockCustomerRepository);
});

afterEach(() => {
  vi.resetAllMocks();
});

it("returns customers", async () => {
  vi.spyOn(mockCustomerRepository, "findAll").mockResolvedValue(Result.ok([validCustomer]));

  const result = await usecase.execute();

  assert.isNull(result.error);
  assert.deepStrictEqual(result.value, [validCustomer]);
});

it("returns error if repository throws", async () => {
  const repoError = new AppError("REPOSITORY_ERROR", "database exploded");
  vi.spyOn(mockCustomerRepository, "findAll").mockResolvedValue(Result.error(repoError));

  const result = await usecase.execute();

  assert.isDefined(result.error);
  assert.instanceOf(result.error, AppError);
  assert.strictEqual(result.error.name, "REPOSITORY_ERROR");
  assert.strictEqual(result.error.message, "database exploded");
});
