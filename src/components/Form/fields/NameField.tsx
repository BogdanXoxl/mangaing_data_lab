import type { FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  error: boolean;
  register: UseFormRegister<FieldValues>;
};

const NameField = ({ error, register }: Props) => {
  return (
    <>
      <label htmlFor="name" className="mt-2 block text-xs font-semibold uppercase text-gray-600">
        Название
      </label>
      <input
        id="name"
        type="text"
        placeholder="john.doe@company.com"
        className={`mt-2 block w-full appearance-none rounded border-2 p-3
                text-default/70 focus:border-primary focus:bg-secondary focus:shadow-inner focus:outline-none ${
                  error
                    ? "border-red-500 bg-primary/10 placeholder:text-red-500"
                    : " bg-default/10 "
                }`}
        {...register("name", { required: true })}
      />
    </>
  );
};

export default NameField;
