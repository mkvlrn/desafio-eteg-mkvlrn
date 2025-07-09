import type { CustomerSchema } from "#/models/customer.ts";

export const validCustomer: CustomerSchema = {
  id: "x1s6w76ikz97ayizxwnwktx9",
  name: "John Doe",
  email: "john.doe@email.com",
  cpf: "95344355033",
  favoriteColor: "ez1y2qioq9hrcn13nk3ve8hy",
};

export const invalidCustomer: Record<string, { customer: object; error: string }> = {
  "missing id": {
    customer: {
      ...validCustomer,
      id: undefined,
    },
    error: "id is required",
  },

  "invalid id": {
    customer: {
      ...validCustomer,
      id: "invalid cuid",
    },
    error: "invalid id format (should be a cuid2)",
  },

  "missing name": {
    customer: {
      ...validCustomer,
      name: undefined,
    },
    error: "name is required",
  },

  "invalid name": {
    customer: {
      ...validCustomer,
      name: 123,
    },
    error: "name should be a string",
  },

  "missing cpf": {
    customer: {
      ...validCustomer,
      cpf: undefined,
    },
    error: "cpf is required",
  },

  "invalid cpf (not a string)": {
    customer: {
      ...validCustomer,
      cpf: 123,
    },
    error: "cpf should be a string",
  },

  "invalid cpf (algorithm)": {
    customer: {
      ...validCustomer,
      cpf: "12345678900",
    },
    error: "invalid cpf",
  },

  "missing email": {
    customer: {
      ...validCustomer,
      email: undefined,
    },
    error: "email is required",
  },

  "invalid email": {
    customer: {
      ...validCustomer,
      email: "invalid email",
    },
    error: "invalid email",
  },

  "missing favoriteColor": {
    customer: {
      ...validCustomer,
      favoriteColor: undefined,
    },
    error: "favoriteColor is required",
  },

  "invalid favoriteColor": {
    customer: {
      ...validCustomer,
      favoriteColor: "invalid cuid",
    },
    error: "invalid favoriteColor format (should be a cuid2)",
  },
};
