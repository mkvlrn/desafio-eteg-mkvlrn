import type { CreateCustomerDto, CustomerDto } from "../models/customer.ts";

export const validCustomer: CustomerDto = {
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
    error: "'id' é campo obrigatório",
  },

  "invalid id": {
    customer: {
      ...validCustomer,
      id: "invalid cuid",
    },
    error: "'id' com formato inválido (deve ser uma cuid2)",
  },

  "missing name": {
    customer: {
      ...validCustomer,
      name: undefined,
    },
    error: "'name' é campo obrigatório",
  },

  "invalid name": {
    customer: {
      ...validCustomer,
      name: 123,
    },
    error: "'name' deve ser uma string",
  },

  "name too short": {
    customer: {
      ...validCustomer,
      name: "ed",
    },
    error: "'name' deve ter no mínimo 3 caracteres",
  },

  "name too long": {
    customer: {
      ...validCustomer,
      name: "x".repeat(81),
    },
    error: "'name' deve ter no máximo 80 caracteres",
  },

  "missing cpf": {
    customer: {
      ...validCustomer,
      cpf: undefined,
    },
    error: "'cpf' e campo obrigatório",
  },

  "cpf inválido (not a string)": {
    customer: {
      ...validCustomer,
      cpf: 123,
    },
    error: "'cpf' deve ser uma string",
  },

  "cpf inválido (algorithm)": {
    customer: {
      ...validCustomer,
      cpf: "12345678900",
    },
    error: "cpf inválido",
  },

  "missing email": {
    customer: {
      ...validCustomer,
      email: undefined,
    },
    error: "'email' é campo obrigatório",
  },

  "email inválido": {
    customer: {
      ...validCustomer,
      email: "email inválido",
    },
    error: "email inválido",
  },

  "missing favoriteColor": {
    customer: {
      ...validCustomer,
      favoriteColor: undefined,
    },
    error: "'favoriteColor' é campo obrigatório",
  },

  "invalid favoriteColor": {
    customer: {
      ...validCustomer,
      favoriteColor: "invalid cuid",
    },
    error: "formato inválido para 'favoriteColor' (deve ser um cuid2)",
  },
};

export const validCreateCustomer: CreateCustomerDto = {
  name: "John Doe",
  email: "john.doe@email.com",
  cpf: "95344355033",
  favoriteColor: "ez1y2qioq9hrcn13nk3ve8hy",
};

export const invalidCreateCustomer: Record<string, { createCustomer: object; error: string }> = {
  "missing name": {
    createCustomer: {
      ...validCreateCustomer,
      name: undefined,
    },
    error: "'name' é campo obrigatório",
  },

  "invalid name": {
    createCustomer: {
      ...validCreateCustomer,
      name: 123,
    },
    error: "'name' deve ser uma string",
  },

  "missing cpf": {
    createCustomer: {
      ...validCreateCustomer,
      cpf: undefined,
    },
    error: "'cpf' e campo obrigatório",
  },

  "cpf inválido (not a string)": {
    createCustomer: {
      ...validCreateCustomer,
      cpf: 123,
    },
    error: "'cpf' deve ser uma string",
  },

  "cpf inválido (algorithm)": {
    createCustomer: {
      ...validCreateCustomer,
      cpf: "12345678900",
    },
    error: "cpf inválido",
  },

  "missing email": {
    createCustomer: {
      ...validCreateCustomer,
      email: undefined,
    },
    error: "'email' é campo obrigatório",
  },

  "email inválido": {
    createCustomer: {
      ...validCreateCustomer,
      email: "email inválido",
    },
    error: "email inválido",
  },

  "missing favoriteColor": {
    createCustomer: {
      ...validCreateCustomer,
      favoriteColor: undefined,
    },
    error: "'favoriteColor' é campo obrigatório",
  },

  "invalid favoriteColor": {
    createCustomer: {
      ...validCreateCustomer,
      favoriteColor: "invalid cuid",
    },
    error: "formato inválido para 'favoriteColor' (deve ser um cuid2)",
  },
};
