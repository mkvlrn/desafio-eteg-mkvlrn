import { assert, describe, it } from "vitest";
import {
  invalidColor,
  invalidCreateColor,
  validColor,
  validCreateColor,
} from "../__fixtures__/color.fixtures.ts";
import { colorSchema, createColorSchema } from "./color.ts";

describe("color model", () => {
  it("validates a valid color", () => {
    const result = colorSchema.safeParse(validColor);

    assert.isTrue(result.success);
  });

  it.each(Object.entries(invalidColor))("invalidates color with %s", (_, data) => {
    const result = colorSchema.safeParse(data.color);

    assert.isFalse(result.success);
    assert.lengthOf(result.error.issues, 1);
    assert.strictEqual(result.error.issues.at(0)?.message, data.error);
  });
});

describe("create color dto", () => {
  it("validates a valid color input", () => {
    const result = createColorSchema.safeParse(validCreateColor);

    assert.isTrue(result.success);
  });

  it.each(Object.entries(invalidCreateColor))("invalidates color input with %s", (_, data) => {
    const result = createColorSchema.safeParse(data.createColor);

    assert.isFalse(result.success);
    assert.lengthOf(result.error.issues, 1);
    assert.strictEqual(result.error.issues.at(0)?.message, data.error);
  });
});
