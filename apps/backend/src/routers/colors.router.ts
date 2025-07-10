import { Hono } from "hono";
import { PrismaColorRepository } from "#/infra/color.prisma-repo.ts";
import { createException } from "#/server/exception.ts";
import { type CreateColorDto, createColorSchema } from "#domain/models/color.ts";
import { AddColorUseCase } from "#domain/usecases/add-color.ts";
import { AppError } from "#domain/utils/app-error.ts";
import type { PrismaClient } from "#prisma/index.js";

export function getColorsRouter(prisma: PrismaClient) {
  const router = new Hono();
  const repo = new PrismaColorRepository(prisma);

  // POST /colors
  router.post("/", async (ctx) => {
    const input = await ctx.req.json<CreateColorDto>();
    const validation = createColorSchema.safeParse(input);

    if (!validation.success) {
      const error = new AppError(
        "BAD_REQUEST",
        validation.error.issues.map((i) => i.message).join("; "),
      );
      throw createException(error);
    }

    const result = await new AddColorUseCase(repo).execute(input);
    if (result.error) {
      throw createException(result.error);
    }

    return ctx.json(result.value, 201);
  });

  return router;
}
