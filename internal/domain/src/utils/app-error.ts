export type AppErrorName =
  | "GENERIC_ERROR"
  | "REPOSITORY_ERROR"
  | "NOT_UNIQUE"
  | "INEXISTENT"
  | "BAD_REQUEST";

export class AppError extends Error {
  override name: AppErrorName;

  constructor(name: AppErrorName, message: string) {
    super(message);
    this.name = name;
  }
}
