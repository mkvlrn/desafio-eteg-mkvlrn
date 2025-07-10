import cpf from "cpf-check";
import { z } from "zod";

export const customerSchema = z.strictObject({
  id: z.cuid2({
    error: (err) =>
      err.input === undefined
        ? "'id' é campo obrigatório"
        : "'id' com formato inválido (deve ser uma cuid2)",
  }),
  name: z
    .string({
      error: (err) =>
        err.input === undefined ? "'name' é campo obrigatório" : "'name' deve ser uma string",
    })
    .min(3, "'name' deve ter no mínimo 3 caracteres")
    .max(80, "'name' deve ter no máximo 80 caracteres"),
  cpf: z
    .string({
      error: (err) =>
        err.input === undefined ? "'cpf' e campo obrigatório" : "'cpf' deve ser uma string",
    })
    .refine(async (value) => cpf.validate(value), { error: "cpf inválido" }),
  email: z
    .email({
      error: (err) => (err.input === undefined ? "'email' é campo obrigatório" : "email inválido"),
    })
    .max(80, "'email' deve ter no máximo 80 caracteres"),
  favoriteColor: z.cuid2({
    error: (err) =>
      err.input === undefined
        ? "'favoriteColor' é campo obrigatório"
        : "formato inválido para 'favoriteColor' (deve ser um cuid2)",
  }),
});
export type CustomerDto = z.infer<typeof customerSchema>;

export const createCustomerSchema = customerSchema.omit({
  id: true,
});
export type CreateCustomerDto = z.infer<typeof createCustomerSchema>;
