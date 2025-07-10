import { CheckIcon } from "@heroicons/react/24/outline";
import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSwr from "swr";
import { z } from "zod";
import { fetcher } from "#/http/fetcher.ts";
import type { ColorDto } from "#domain/models/color.ts";
import { type CreateCustomerDto, createCustomerSchema } from "#domain/models/customer.ts";

const emptyForm: CreateCustomerDto = {
  name: "",
  email: "",
  cpf: "",
  favoriteColor: "",
};

export function useCustomerForm() {
  const [working, setWorking] = useState(false);
  const [formData, setFormData] = useState<CreateCustomerDto>(emptyForm);
  const [hex, setHex] = useState("#FFFFFF");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const { data, error, isLoading } = useSwr<ColorDto[]>("/api/colors", fetcher);

  useEffect(() => {
    const first = data?.[0]?.id;
    if (first && formData.favoriteColor === "") {
      setFormData((prev) => ({ ...prev, favoriteColor: first }));
    }
  }, [data]);

  useEffect(() => {
    const match = data?.find((c) => c.id === formData.favoriteColor);
    if (match?.hex) {
      setHex(match.hex);
    }
  }, [formData.favoriteColor, data]);

  async function handleTextInputChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    const newValue = name === "cpf" ? value.replace(/\D/g, "") : value;
    const newFormData = { ...formData, [name]: newValue };

    setFormData(newFormData);

    const validation = await createCustomerSchema.safeParseAsync(newFormData);
    const key = e.target.name as keyof CreateCustomerDto;

    setErrors((prev) => ({
      ...prev,
      [key]: validation.success ? [] : (z.flattenError(validation.error).fieldErrors[key] ?? []),
    }));
  }

  function resetForm() {
    setFormData({ ...emptyForm, favoriteColor: data?.[0]?.id ?? "" });
    setErrors({});
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setWorking(true);

    try {
      const response = await fetch("/api/customers", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      toast.success("Cadastro efetuado com sucesso!>", {
        position: "top-center",
        theme: "colored",
      });
    } catch (err) {
      toast.error(`Erro: ${(err as Error).message}`, { position: "top-center", theme: "colored" });
    } finally {
      resetForm();
      setWorking(false);
    }
  }

  return {
    working,
    formData,
    hex,
    errors,
    data,
    error,
    isLoading,
    handleTextInputChange,
    resetForm,
    handleSubmit,
  };
}
