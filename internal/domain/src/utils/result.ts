/**
 * Result type to represent the outcome of an operation.
 * It can either be a success with a value or an error with an error message.
 * This is a generic type that can be used with any type of value and error.
 *
 * It is also an alias object containing the ok and error functions to
 * make it easier to create Result objects.
 */
export type Result<T, E = Error> =
  | { readonly error: undefined; readonly value: T }
  | { readonly error: E };

export const Result: {
  ok<T>(value: T): Result<T, never>;
  error<E = Error>(error: E): Result<never, E>;
} = {
  /**
   * Creates a successful Result with the given value.
   * @param value The success value
   * @returns A Result object representing success
   */
  ok: <T>(value: T): Result<T, never> => ({ error: undefined, value }),
  /**
   * Creates an error Result with the given error.
   * @param error The error value
   * @returns A Result object representing error
   */
  error: <E = Error>(error: E): Result<never, E> => ({ error }),
};
