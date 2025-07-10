import { AppError } from "#domain/utils/app-error.ts";

export async function fetcher<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new AppError("GENERIC_ERROR", response.statusText);
  }

  const data = await response.json();

  return data as T;
}
