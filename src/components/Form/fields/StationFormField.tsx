import type { FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  error: boolean;
  register: UseFormRegister<FieldValues>;
};

const StationFormField = ({ error, register }: Props) => {
  return (
    <>
      <label
        htmlFor="station_form"
        className="mt-4 block text-xs font-semibold uppercase text-gray-600"
      >
        Форма станции
      </label>
      <input
        id="station_form"
        type="text"
        placeholder="Форма станции"
        className={`mt-2 block w-full appearance-none rounded border-2 p-3
                text-default/70 focus:border-primary focus:bg-secondary focus:shadow-inner focus:outline-none ${
                  error
                    ? "border-red-500 bg-primary/10 placeholder:text-red-500"
                    : " bg-default/10 "
                }`}
        {...register("station_form", { required: true })}
      />
    </>
  );
};

export default StationFormField;
