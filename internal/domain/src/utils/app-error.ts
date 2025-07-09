export type AppErrorName = "GENERIC_ERROR" | "REPOSITORY_ERROR" | "NOT_UNIQUE";

export class AppError extends Error {
  constructor(name: AppErrorName, message: string) {
    super(message);
    this.name = name;
  }
}
