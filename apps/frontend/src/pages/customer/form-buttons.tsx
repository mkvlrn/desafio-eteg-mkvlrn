type Props = {
  disabled: boolean;
  working: boolean;
  onReset: () => void;
};

export function FormButtons({ disabled, working, onReset }: Props) {
  return (
    <div className="flex flex-row gap-x-2">
      <button
        className="flex w-full cursor-pointer justify-center rounded-md bg-c1 px-3 py-1.5 font-semibold text-c5 text-sm/6 shadow-xs focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={disabled || working}
        type="submit"
      >
        Enviar
      </button>
      <button
        className="flex w-full cursor-pointer justify-center rounded-md bg-c2 px-3 py-1.5 font-semibold text-c5 text-sm/6 shadow-xs focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 disabled:opacity-50"
        disabled={working}
        onClick={onReset}
        type="reset"
      >
        Limpar
      </button>
    </div>
  );
}
