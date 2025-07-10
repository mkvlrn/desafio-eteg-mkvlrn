import type { ColorDto, CreateColorDto } from "../models/color.ts";

export const validColor: ColorDto = {
  id: "fkenb7xc1p4uipbrcerlh2bq",
  name: "red",
  hex: "#ff0000",
};

export const invalidColor: Record<string, { color: object; error: string }> = {
  "missing id": {
    color: {
      ...validColor,
      id: undefined,
    },
    error: "'id' é campo obrigatório",
  },

  "invalid id": {
    color: {
      ...validColor,
      id: "invalid cuid",
    },
    error: "'id' com formato inválido",
  },

  "missing name": {
    color: {
      ...validColor,
      name: undefined,
    },
    error: "'name' é campo obrigatório",
  },

  "invalid name": {
    color: {
      ...validColor,
      name: 123,
    },
    error: "'name' deve ser uma string",
  },

  "missing hex": {
    color: {
      ...validColor,
      hex: undefined,
    },
    error: "'hex' é campo obrigatório",
  },

  "invalid hex (not a string)": {
    color: {
      ...validColor,
      hex: 123456,
    },
    error: "'hex' deve ser uma string",
  },

  "invalid hex (format)": {
    color: {
      ...validColor,
      hex: "invalid hex",
    },
    error: "invalid hex format",
  },
};

export const validCreateColor: CreateColorDto = {
  name: "red",
  hex: "#ff0000",
};

export const invalidCreateColor: Record<string, { createColor: object; error: string }> = {
  "missing name": {
    createColor: {
      ...validCreateColor,
      name: undefined,
    },
    error: "'name' é campo obrigatório",
  },

  "invalid name": {
    createColor: {
      ...validCreateColor,
      name: 123,
    },
    error: "'name' deve ser uma string",
  },

  "invalid hex (not a string)": {
    createColor: {
      ...validCreateColor,
      hex: 123456,
    },
    error: "'hex' deve ser uma string",
  },

  "invalid hex (format)": {
    createColor: {
      ...validCreateColor,
      hex: "invalid hex",
    },
    error: "invalid hex format",
  },
};
