import type { ChangeEvent } from "react";

type LabeledInputProps = {
  id: string;
  label: string;
  type?: string;
  value: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: string[];
  autoComplete?: string;
  working: boolean;
};

export function LabeledInput({
  id,
  label,
  type = "text",
  value,
  name,
  onChange,
  errors,
  autoComplete,
  working,
}: LabeledInputProps) {
  return (
    <div>
      <label className="block font-medium text-gray-900 text-sm/6" htmlFor={id}>
        <span>{label}</span>
        {errors.length > 0 && (
          <span className="ml-2 font-normal text-red-500 text-sm">{errors.join(", ")}</span>
        )}
      </label>
      <div className="mt-2">
        <input
          autoComplete={autoComplete}
          className="-outline-offset-1 focus:-outline-offset-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 disabled:opacity-50 sm:text-sm/6"
          disabled={working}
          id={id}
          name={name}
          onChange={onChange}
          type={type}
          value={value}
        />
      </div>
    </div>
  );
}
