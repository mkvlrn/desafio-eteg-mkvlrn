import useSwr from "swr";
import { fetcher } from "#/http/fetcher.ts";
import type { ColorDto } from "#domain/models/color.ts";
import type { CustomerDto } from "#domain/models/customer.ts";

export function useAdminData() {
  const {
    data: colorData,
    error: colorError,
    isLoading: colorLoading,
  } = useSwr<ColorDto[]>("/api/colors", fetcher);
  const {
    data: customerData,
    error: customerError,
    isLoading: customerLoading,
  } = useSwr<CustomerDto[]>("/api/customers", fetcher);

  return {
    isLoading: colorLoading || customerLoading,
    error: colorError || customerError,
    colorData,
    customerData,
  };
}
