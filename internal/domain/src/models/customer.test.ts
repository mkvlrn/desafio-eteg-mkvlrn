import { assert, describe, it } from "vitest";
import {
  invalidCreateCustomer,
  invalidCustomer,
  validCreateCustomer,
  validCustomer,
} from "../__fixtures__/customer.fixtures.ts";
import { createCustomerSchema, customerSchema } from "./customer.ts";

describe("customer model", () => {
  it("validates a valid customer", async () => {
    const result = await customerSchema.safeParseAsync(validCustomer);

    assert.isTrue(result.success);
  });

  it.each(Object.entries(invalidCustomer))("invalidates customer with %s", async (_, data) => {
    const result = await customerSchema.safeParseAsync(data.customer);

    assert.isFalse(result.success);
    assert.lengthOf(result.error.issues, 1);
    assert.strictEqual(result.error.issues.at(0)?.message, data.error);
  });
});

describe("create customer dto", () => {
  it("validates a valid customer input", async () => {
    const result = await createCustomerSchema.safeParseAsync(validCreateCustomer);

    assert.isTrue(result.success);
  });

  it.each(Object.entries(invalidCreateCustomer))(
    "invalidates customer input with %s",
    async (_, data) => {
      const result = await createCustomerSchema.safeParseAsync(data.createCustomer);

      assert.isFalse(result.success);
    },
  );
});
