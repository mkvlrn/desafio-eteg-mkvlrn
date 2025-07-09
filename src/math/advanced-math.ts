import { Result } from "@mkvlrn/result";

export function multiply(a: number, b: number): number {
  return a * b;
}

export function divide(a: number, b: number): Result<number> {
  if (b === 0) {
    return Result.error(new Error("Division by zero is not allowed"));
  }

  return Result.ok(a / b);
}
