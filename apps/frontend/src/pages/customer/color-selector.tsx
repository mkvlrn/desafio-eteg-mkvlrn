import type { ChangeEvent } from "react";
import type { ColorDto } from "#domain/models/color.ts";

type Props = {
  id: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: ColorDto[];
  hex: string;
  working: boolean;
};

export function ColorSelector({ id, name, value, onChange, options, hex, working }: Props) {
  return (
    <div>
      <label className="block font-medium text-gray-900 text-sm/6" htmlFor={id}>
        Cor favorita
      </label>
      <div className="mt-2 flex gap-x-2">
        <select
          className="-outline-offset-1 focus:-outline-offset-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 disabled:opacity-50 sm:text-sm/6"
          disabled={working}
          id={id}
          name={name}
          onChange={onChange}
          required={true}
          value={value}
        >
          {options.map((color) => (
            <option key={color.id} value={color.id}>
              {color.name}
            </option>
          ))}
        </select>
        <input disabled={true} type="color" value={hex} />
      </div>
    </div>
  );
}
