import { assert, it } from "vitest";
import { AppError } from "#/utils/app-error.ts";
import { Result } from "#/utils/result.ts";

it("creates a successful result", () => {
  const result = Result.ok(123);

  assert.isNull(result.error);
  assert.isDefined(result.value);
});

it("creates an error result", () => {
  const result = Result.error(new AppError("GENERIC_ERROR", "something broke"));

  assert.isDefined(result.error);
  assert.instanceOf(result.error, AppError);
  assert.strictEqual(result.error.name, "GENERIC_ERROR");
  assert.strictEqual(result.error.message, "something broke");
});
