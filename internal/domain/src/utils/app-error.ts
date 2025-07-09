export type AppErrorName = "GENERIC_ERROR" | "REPOSITORY_ERROR";

export class AppError extends Error {
  constructor(name: AppErrorName, message: string) {
    super(message);
    this.name = name;
  }
}
