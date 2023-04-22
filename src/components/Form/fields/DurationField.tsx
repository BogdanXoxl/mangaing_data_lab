"use client";

import { useEffect, useState } from "react";
import type { Control } from "react-hook-form";
import { useController } from "react-hook-form";

type Props = {
  error: boolean;
  control: Control;
};

const DurationField = ({ error, control }: Props) => {
  const { field, formState } = useController({
    name: "duration",
    control,
    rules: { required: true, min: 0 },
  });

  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    field.onChange(value);
  }, [value, field]);

  useEffect(() => {
    setValue(formState.defaultValues?.duration || 0);
  }, [formState.defaultValues]);

  return (
    <>
      <label
        htmlFor="duration"
        className="mt-4 block text-xs font-semibold uppercase text-gray-600"
      >
        Время в пути (час)
      </label>
      <div className="relative mt-1 flex h-10 w-full flex-row rounded-lg bg-transparent">
        <button
          onClick={() => setValue((prev) => (prev >= 1 ? prev - 1 : 0))}
          type="button"
          className=" h-full w-20 cursor-pointer rounded-l bg-default/10 text-gray-600 outline-none hover:bg-default/30 hover:text-gray-700"
        >
          <span className="m-auto text-2xl font-thin">−</span>
        </button>
        <input
          id="duration"
          name="duration"
          type="number"
          className={`flex w-full items-center bg-default/10 text-center font-semibold text-default/70 
            outline-none focus:outline-none  ${
              error ? "border-red-500 bg-primary/10 placeholder:text-red-500" : " bg-default/10 "
            }`}
          value={value}
          disabled
        />
        <button
          onClick={() => setValue((prev) => prev + 1)}
          type="button"
          className="h-full w-20 cursor-pointer rounded-r bg-default/10 text-gray-600 hover:bg-default/30 hover:text-gray-700"
        >
          <span className="m-auto text-2xl font-thin">+</span>
        </button>
      </div>
    </>
  );
};

export default DurationField;
