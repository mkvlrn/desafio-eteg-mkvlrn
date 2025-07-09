import type { ColorSchema } from "#/models/color.ts";

export const validColor: ColorSchema = {
  id: "fkenb7xc1p4uipbrcerlh2bq",
  name: "red",
  hex: "#ff0000",
};

export const validColorWithoutHex: ColorSchema = {
  id: "xps9lijjnhtusv34s17d3ewy",
  name: "green",
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

  "invalid hex": {
    color: {
      ...validColor,
      hex: "invalid hex",
    },
    error: "invalid hex format",
  },
};
