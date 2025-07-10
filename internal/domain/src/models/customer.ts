import cpf from "cpf-check";
import { z } from "zod";

export const customerSchema = z.strictObject({
  id: z.cuid2({
    error: (err) =>
      err.input === undefined ? "id is required" : "invalid id format (should be a cuid2)",
  }),
  name: z
    .string({
      error: (err) => (err.input === undefined ? "name is required" : "name should be a string"),
    })
    .min(3, "name min length is 3")
    .max(80, "name max length is 80"),
  cpf: z
    .string({
      error: (err) => (err.input === undefined ? "cpf is required" : "cpf should be a string"),
    })
    .refine(async (value) => cpf.validate(value), { error: "invalid cpf" }),
  email: z
    .email({
      error: (err) => (err.input === undefined ? "email is required" : "invalid email"),
    })
    .max(80, "email max length is 80"),
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
