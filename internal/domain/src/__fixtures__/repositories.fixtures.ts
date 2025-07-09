import { vi } from "vitest";
import type { ColorRepository } from "#/repositories/color.repository.ts";
import type { CustomerRepository } from "#/repositories/customer.repository.ts";

export const mockColorRepository: ColorRepository = {
  create: vi.fn(),
  findAll: vi.fn(),
  findById: vi.fn(),
  findByName: vi.fn(),
  delete: vi.fn(),
};

export const mockCustomerRepository: CustomerRepository = {
  create: vi.fn(),
  findAll: vi.fn(),
  findById: vi.fn(),
  findByEmail: vi.fn(),
  delete: vi.fn(),
};
