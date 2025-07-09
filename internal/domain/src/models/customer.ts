import { validate } from "cpf-check";
import z from "zod/v4";

export const customerSchema = z.strictObject({
  id: z.cuid2({
    error: (err) =>
      err.input === undefined ? "id is required" : "invalid id format (should be a cuid2)",
  }),
  name: z.string({
    error: (err) => (err.input === undefined ? "name is required" : "name should be a string"),
  }),
  cpf: z
    .string({
      error: (err) => (err.input === undefined ? "cpf is required" : "cpf should be a string"),
    })
    .refine((value) => validate(value), { error: "invalid cpf" }),
  email: z.email({
    error: (err) => (err.input === undefined ? "email is required" : "invalid email"),
  }),
  favoriteColor: z.cuid2({
    error: (err) =>
      err.input === undefined
        ? "favoriteColor is required"
        : "invalid favoriteColor format (should be a cuid2)",
  }),
});
export type CustomerDto = z.infer<typeof customerSchema>;

export const createCustomerSchema = customerSchema.omit({
  id: true,
});
export type CreateCustomerDto = z.infer<typeof createCustomerSchema>;
