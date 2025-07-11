import { z } from "zod";

const colorRegex = /^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

export const colorSchema = z.strictObject({
  id: z.cuid2({
    error: (err) =>
      err.input === undefined ? "'id' é campo obrigatório" : "'id' com formato inválido",
  }),
  name: z.string({
    error: (err) =>
      err.input === undefined ? "'name' é campo obrigatório" : "'name' deve ser uma string",
  }),
  hex: z
    .string({
      error: (err) =>
        err.input === undefined ? "'hex' é campo obrigatório" : "'hex' deve ser uma string",
    })
    .regex(colorRegex, { error: "formato hex inválido" }),
});
export type ColorDto = z.infer<typeof colorSchema>;

export const createColorSchema = colorSchema.omit({
  id: true,
});
export type CreateColorDto = z.infer<typeof createColorSchema>;
