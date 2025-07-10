import type { ContentfulStatusCode } from "hono/utils/http-status";
import { assert, describe, it } from "vitest";
import { createException } from "#/server/exception.ts";
import { AppError, type AppErrorName } from "#domain/utils/app-error.ts";

describe("createException", () => {
  it("returns HTTPException with correct response", async () => {
    const error = new AppError("BAD_REQUEST", "Invalid input");
    const exception = createException(error);
    const res = exception.getResponse();
    const json = await res.json();

    assert.strictEqual(res.status, 400);
    assert.strictEqual(res.headers.get("Content-Type"), "application/json");
    assert.deepStrictEqual(json, {
      status: 400,
      statusText: "BAD_REQUEST",
      message: "Invalid input",
    });
  });

  it("maps all error names to expected status codes", () => {
    const map = new Map<AppErrorName, ContentfulStatusCode>();
    map.set("BAD_REQUEST", 400);
    map.set("INEXISTENT", 404);
    map.set("NOT_UNIQUE", 409);
    map.set("GENERIC_ERROR", 500);
    map.set("REPOSITORY_ERROR", 502);

    for (const [name, code] of map) {
      const error = new AppError(name, "test");
      const exception = createException(error);
      assert.strictEqual(exception.status, code);
    }
  });
});
