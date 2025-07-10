/** biome-ignore-all lint/style/useNamingConvention: union type is in all caps */

import { HTTPException } from "hono/http-exception";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import type { AppError, AppErrorName } from "#domain/utils/app-error.ts";

export function createException(appError: AppError): HTTPException {
  const map = new Map<AppErrorName, ContentfulStatusCode>();
  map.set("BAD_REQUEST", 400);
  map.set("INEXISTENT", 404);
  map.set("NOT_UNIQUE", 409);
  map.set("GENERIC_ERROR", 500);
  map.set("REPOSITORY_ERROR", 502);

  const response = {
    status: map.get(appError.name),
    statusText: appError.name === "REPOSITORY_ERROR" ? "BAD_GATEWAY" : appError.name,
    message: appError.message,
  };

  return new HTTPException(map.get(appError.name), {
    res: new Response(JSON.stringify(response), {
      status: response.status as number,
      headers: { "Content-Type": "application/json" },
    }),
  });
}
