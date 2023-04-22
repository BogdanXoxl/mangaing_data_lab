"use client";

import { useQuery } from "@apollo/client";
import { notFound } from "next/navigation";

import { Form } from "@/components/Form";

import { StationDocument, UpdateStationDocument } from "./gql";

// TODO:: try use server component here
// export const revalidate = 3600;

type Props = {
  params: { id: string };
};

const EditStation = ({ params: { id } }: Props) => {
  const { data, loading } = useQuery(StationDocument, {
    variables: {
      filters: {
        id: Number(id),
      },
    },
  });

  const defaultValues = {
    id: data?.stations[0]?.id,
    name: data?.stations[0]?.name,
    station_form: data?.stations[0]?.station_form,
  };

  if (typeof window !== "undefined" && !loading && !data?.stations?.length) notFound();

  return (
    <div className="mt-5 flex h-full flex-col justify-center">
      <Form
        refetchQueries={[{ query: StationDocument }]}
        fields={["name", "station_form"]}
        mutation={UpdateStationDocument}
        defaultValues={defaultValues}
      />
    </div>
  );
};

export default EditStation;
