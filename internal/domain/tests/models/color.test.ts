import { assert, describe, it } from "vitest";
import { colorSchema } from "#/models/color.ts";
import { invalidColor, validColor, validColorWithoutHex } from "##/__fixtures__/color.fixtures.ts";

describe("color model", () => {
  it("validates a valid color", () => {
    const result = colorSchema.safeParse(validColor);

    assert.isTrue(result.success);
  });

  it("validates a valid color without hex value", () => {
    const result = colorSchema.safeParse(validColorWithoutHex);

    assert.isTrue(result.success);
  });

  it.each(Object.entries(invalidColor))("invalidates color with %s", (_, data) => {
    const result = colorSchema.safeParse(data.color);

    assert.isFalse(result.success);
    assert.lengthOf(result.error.issues, 1);
    assert.strictEqual(result.error.issues.at(0)?.message, data.error);
  });
});
