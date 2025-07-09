import { assert, it } from "vitest";
import { Result } from "#/utils/result.ts";

it("creates a successful result", () => {
  const result = Result.ok(123);

  assert.isUndefined(result.error);
  assert.isDefined(result.value);
});

it("creates an error result", () => {
  const result = Result.error(new Error("fail"));

  assert.isDefined(result.error);
  assert.strictEqual(result.error.message, "fail");
});
