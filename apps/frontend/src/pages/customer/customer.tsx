import { UserPlusIcon } from "@heroicons/react/24/solid";
import { Loading } from "#/components/loading.tsx";
import { ColorSelector } from "#/pages/customer/color-selector.tsx";
import { FormButtons } from "#/pages/customer/form-buttons.tsx";
import { LabeledInput } from "#/pages/customer/labeled-input.tsx";
import { useCustomerForm } from "#/pages/customer/use-customer-form.ts";

export function CustomerPage() {
  const {
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
  } = useCustomerForm();

  return (
    <>
      {error && <div>error</div>}

      {isLoading && <Loading />}

      {data && (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <UserPlusIcon className="mx-auto h-16 w-auto text-c1" />
            <h2 className="mt-10 text-center font-bold text-2xl/9 text-gray-900 tracking-tight">
              Faça seu cadastro
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <LabeledInput
                errors={errors.name ?? []}
                id="name"
                label="Nome"
                name="name"
                onChange={handleTextInputChange}
                value={formData.name}
                working={working}
              />

              <LabeledInput
                errors={errors.email ?? []}
                id="email"
                label="Email"
                name="email"
                onChange={handleTextInputChange}
                value={formData.email}
                working={working}
              />

              <LabeledInput
                errors={errors.cpf ?? []}
                id="cpf"
                label="CPF (somente números)"
                name="cpf"
                onChange={handleTextInputChange}
                value={formData.cpf}
                working={working}
              />

              <ColorSelector
                hex={hex}
                id="favoriteColor"
                name="favoriteColor"
                onChange={handleTextInputChange}
                options={data}
                value={formData.favoriteColor}
                working={working}
              />

              <FormButtons
                disabled={
                  Object.values(formData).some((v) => v === "") ||
                  Object.values(errors).some((e) => e.length > 0)
                }
                onReset={resetForm}
                working={working}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
