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
    error: "id is required",
  },

  "invalid id": {
    color: {
      ...validColor,
      id: "invalid cuid",
    },
    error: "invalid id format",
  },

  "missing name": {
    color: {
      ...validColor,
      name: undefined,
    },
    error: "name is required",
  },

  "invalid name": {
    color: {
      ...validColor,
      name: 123,
    },
    error: "name should be a string",
  },

  "missing hex": {
    color: {
      ...validColor,
      hex: undefined,
    },
    error: "hex is required",
  },

  "invalid hex (not a string)": {
    color: {
      ...validColor,
      hex: 123456,
    },
    error: "hex should be a string",
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
    error: "name is required",
  },

  "invalid name": {
    createColor: {
      ...validCreateColor,
      name: 123,
    },
    error: "name should be a string",
  },

  "invalid hex (not a string)": {
    createColor: {
      ...validCreateColor,
      hex: 123456,
    },
    error: "hex should be a string",
  },

  "invalid hex (format)": {
    createColor: {
      ...validCreateColor,
      hex: "invalid hex",
    },
    error: "invalid hex format",
  },
};
