import { z } from "zod";

const colorRegex = /^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

export const colorSchema = z.strictObject({
  id: z.cuid2({
    error: (err) => (err.input === undefined ? "id is required" : "invalid id format"),
  }),
  name: z.string({
    error: (err) => (err.input === undefined ? "name is required" : "name should be a string"),
  }),
  hex: z
    .string({ error: "hex should be a string" })
    .regex(colorRegex, { error: "invalid hex format" })
    .nullish(),
});
export type ColorDto = z.infer<typeof colorSchema>;

export const createColorSchema = colorSchema.omit({
  id: true,
});
export type CreateColorDto = z.infer<typeof createColorSchema>;
