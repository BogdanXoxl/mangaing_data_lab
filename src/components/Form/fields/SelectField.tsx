import type { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";

type Props = {
  label?: string;
  name: string;
  placeholder?: string;
  values: (number | string | undefined)[];
  error: boolean;
  register: UseFormRegister<FieldValues>;
  registerRules?: RegisterOptions;
};

const StationField = ({
  label,
  name,
  placeholder,
  values,
  error,
  register,
  registerRules,
}: Props) => {
  return (
    <>
      {label && (
        <label htmlFor={name} className="mt-4 block text-xs font-semibold uppercase text-gray-600">
          {label}
        </label>
      )}

      <select
        id={name}
        placeholder={placeholder}
        className={`mt-2 block w-full appearance-none rounded border-2 p-3
                text-default/70 focus:border-primary focus:bg-secondary focus:shadow-inner focus:outline-none ${
                  error
                    ? "border-red-500 bg-primary/10 placeholder:text-red-500"
                    : " bg-default/10 "
                }`}
        {...register(name, { required: true, ...registerRules })}
      >
        {values.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
    </>
  );
};

export default StationField;
