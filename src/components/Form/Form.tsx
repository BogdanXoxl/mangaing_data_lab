"use client";

import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import type { DocumentNode } from "graphql/language";
import React, { useEffect, useMemo } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import type { Fields } from "./fields";
import { getField, getSchema } from "./fields";

// TODO:: catch apollo error

type Props = {
  fields: Fields;
  mutation: DocumentNode;
  refetchQueries: string[] | { query: DocumentNode }[];
  defaultValues?: {
    id?: number;
    name?: string;
    station_form?: string;
    duration?: number;
    pause?: number;
    station_id?: number;
    train_id?: number;
  };
};

const Form = ({ fields, defaultValues, mutation, refetchQueries }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getSchema(fields)),
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
  });
  useEffect(() => reset(defaultValues), [defaultValues, reset]);
  const [mutate, { loading, error }] = useMutation(mutation, { refetchQueries });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit: SubmitHandler<any> = async (data) => {
    await mutate({ variables: data });

    if (!error) {
      reset();
    }
  };

  // console.log(errors, error);
  return (
    <div className="mx-auto w-full max-w-2xl rounded-sm border border-gray-200 bg-white px-5 py-3 shadow-lg">
      {defaultValues?.id && (
        <header className="border-b border-gray-100 py-4">
          <div className="font-semibold text-default">Станция #{defaultValues?.id}</div>
        </header>
      )}
      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field) => (
          <React.Fragment key={field}>
            {getField({ register, errors, control })[field]}
          </React.Fragment>
        ))}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-default py-3 font-medium uppercase tracking-widest text-primary shadow-lg hover:bg-gray-900 hover:shadow-none focus:outline-none"
        >
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default Form;
