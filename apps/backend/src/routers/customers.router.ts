import { Hono } from "hono";
import { PrismaCustomerRepository } from "#/infra/customer.prisma-repo.ts";
import { createException } from "#/server/exception.ts";
import { type CreateCustomerDto, createCustomerSchema } from "#domain/models/customer.ts";
import { AddCustomerUseCase } from "#domain/usecases/add-customer.ts";
import { DeleteCustomerUseCase } from "#domain/usecases/delete-customer.ts";
import { ListCustomersUseCase } from "#domain/usecases/list-customers.ts";
import { AppError } from "#domain/utils/app-error.ts";
import type { PrismaClient } from "#prisma/index.js";

export function getCustomersRouter(prisma: PrismaClient) {
  const router = new Hono();
  const repo = new PrismaCustomerRepository(prisma);

  // POST /customers
  router.post("/", async (ctx) => {
    const input = await ctx.req.json<CreateCustomerDto>();
    const validation = await createCustomerSchema.safeParseAsync(input);

    if (!validation.success) {
      const error = new AppError(
        "BAD_REQUEST",
        validation.error.issues.map((i) => i.message).join("; "),
      );
      throw createException(error);
    }

    const result = await new AddCustomerUseCase(repo).execute(input);
    if (result.error) {
      throw createException(result.error);
    }

    return ctx.json(result.value, 201);
  });

  // GET /customers
  router.get("/", async (ctx) => {
    const result = await new ListCustomersUseCase(repo).execute();
    if (result.error) {
      throw createException(result.error);
    }

    return ctx.json(result.value, 200);
  });

  // DELETE /customers/:id
  router.delete("/:id", async (ctx) => {
    const id = ctx.req.param("id");
    const result = await new DeleteCustomerUseCase(repo).execute(id);
    if (result.error) {
      throw createException(result.error);
    }

    return ctx.body(null, 204);
  });

  return router;
}
