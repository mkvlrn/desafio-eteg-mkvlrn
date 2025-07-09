import { assert, describe, it } from "vitest";
import {
  invalidCreateCustomer,
  invalidCustomer,
  validCreateCustomer,
  validCustomer,
} from "../__fixtures__/customer.fixtures.ts";
import { createCustomerSchema, customerSchema } from "./customer.ts";

describe("customer model", () => {
  it("validates a valid customer", () => {
    const result = customerSchema.safeParse(validCustomer);

    assert.isTrue(result.success);
  });

  it.each(Object.entries(invalidCustomer))("invalidates customer with %s", (_, data) => {
    const result = customerSchema.safeParse(data.customer);

    assert.isFalse(result.success);
    assert.lengthOf(result.error.issues, 1);
    assert.strictEqual(result.error.issues.at(0)?.message, data.error);
  });
});

describe("create customer dto", () => {
  it("validates a valid customer input", () => {
    const result = createCustomerSchema.safeParse(validCreateCustomer);

    assert.isTrue(result.success);
  });

  it.each(Object.entries(invalidCreateCustomer))(
    "invalidates customer input with %s",
    (_, data) => {
      const result = createCustomerSchema.safeParse(data.createCustomer);

      assert.isFalse(result.success);
    },
  );
});
