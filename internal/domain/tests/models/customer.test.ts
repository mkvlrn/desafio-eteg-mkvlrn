import { assert, describe, it } from "vitest";
import { customerSchema } from "#/models/customer.ts";
import { invalidCustomer, validCustomer } from "##/__fixtures__/customer.fixtures.ts";

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
