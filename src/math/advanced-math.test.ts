import { assert, describe, it } from "vitest";
import { divide, multiply } from "#/math/advanced-math.ts";

describe("advanced-math", () => {
  describe("multiply", () => {
    it("should multiply two numbers", () => {
      const twoTimesTwo = multiply(2, 2);
      const twoTimesThree = multiply(2, 3);

      assert.strictEqual(twoTimesTwo, 4);
      assert.strictEqual(twoTimesThree, 6);
    });
  });

  describe("divide", () => {
    it("should divide two numbers", () => {
      const twoDividedByTwo = divide(2, 2);
      const twoDividedByFour = divide(2, 4);

      assert.isUndefined(twoDividedByTwo.error);
      assert.strictEqual(twoDividedByTwo.value, 1);
      assert.isUndefined(twoDividedByFour.error);
      assert.strictEqual(twoDividedByFour.value, 0.5);
    });

    it("should return an error when dividing by zero", () => {
      const divideByZero = divide(2, 0);

      assert.isDefined(divideByZero.error);
      assert.instanceOf(divideByZero.error, Error);
      assert.strictEqual(divideByZero.error.message, "Division by zero is not allowed");
    });
  });
});
