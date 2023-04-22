import type { Control, FieldValues, UseFormRegister } from "react-hook-form";
import type { FieldErrors } from "react-hook-form/dist/types/errors";
import type { AnySchema } from "yup";
import * as yup from "yup";

import DurationField from "./DurationField";
import NameField from "./NameField";
import PauseField from "./PauseField";
import StationField from "./StationField";
import StationFormField from "./StationFormField";
import TrainField from "./TrainField";

export type Fields = Array<
  "name" | "station_form" | "duration" | "pause" | "station_id" | "train_id"
>;

type GetField = { [key in Fields[number]]: React.ReactNode };

type Props = {
  register: UseFormRegister<FieldValues>;
  control: Control;
  errors: FieldErrors;
};

export const getField = ({ register, errors, control }: Props): GetField => ({
  name: <NameField error={!!errors.name} register={register} />,
  station_form: <StationFormField error={!!errors.station_form} register={register} />,
  duration: <DurationField error={!!errors.duration} control={control} />,
  pause: <PauseField error={!!errors.pause} control={control} />,
  station_id: <StationField error={!!errors.pause} register={register} />,
  train_id: <TrainField error={!!errors.pause} register={register} />,
});

const VALIDATION_OBJ: { [key in Fields[number]]: AnySchema } = {
  name: yup.string().required(),
  station_form: yup.string().required(),
  duration: yup.number().min(0).default(0),
  pause: yup.number().min(0).default(0),
  station_id: yup.number().required(),
  train_id: yup.number().required(),
};

export const getSchema = (fields: Fields) =>
  yup
    .object({
      ...fields
        .map((f) => ({
          [f]: VALIDATION_OBJ[f],
        }))
        .reduce((map, currentValue) => ({ ...map, ...currentValue }), {}),
    })
    .required();
