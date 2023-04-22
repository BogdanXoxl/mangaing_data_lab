"use client";

import { useQuery } from "@apollo/client";
import type { FieldValues, UseFormRegister } from "react-hook-form";

import SelectField from "../SelectField";
import { TrainsDocument } from "./gql";

type Props = {
  error: boolean;
  register: UseFormRegister<FieldValues>;
};

const StationField = ({ error, register }: Props) => {
  const { data } = useQuery(TrainsDocument);
  const values = data?.trains.map((s) => s?.id) || [];

  return (
    <SelectField
      label="Номер поезда"
      placeholder="Номер поезда"
      name="train_id"
      values={values}
      error={error}
      register={register}
      registerRules={{ valueAsNumber: true }}
    />
  );
};

export default StationField;
