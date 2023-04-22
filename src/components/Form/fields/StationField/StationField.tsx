"use client";

import { useQuery } from "@apollo/client";
import type { FieldValues, UseFormRegister } from "react-hook-form";

import SelectField from "../SelectField";
import { StationsDocument } from "./gql";

type Props = {
  error: boolean;
  register: UseFormRegister<FieldValues>;
};

const StationField = ({ error, register }: Props) => {
  const { data } = useQuery(StationsDocument);
  const values = data?.stations.map((s) => s?.id) || [];

  return (
    <SelectField
      label="Код станции"
      placeholder="Код станции"
      name="station_id"
      values={values}
      error={error}
      register={register}
      registerRules={{ valueAsNumber: true }}
    />
  );
};

export default StationField;
