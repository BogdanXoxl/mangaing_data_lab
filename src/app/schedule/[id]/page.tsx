"use client";

import { useQuery } from "@apollo/client";
import { notFound, useRouter } from "next/navigation";

import { Form } from "@/components/Form";

import { ScheduleDocument, UpdateScheduleDocument } from "./gql";

// TODO:: sometimes error with prisma
// TODO:: try use server component here
// export const revalidate = 3600;

type Props = {
  params: { id: string };
};

const EditSchedule = ({ params: { id } }: Props) => {
  const router = useRouter();
  const { data, loading } = useQuery(ScheduleDocument, {
    variables: {
      filters: {
        id: Number(id),
      },
    },
  });

  const defaultValues = {
    id: data?.schedule[0]?.id,
    pause: data?.schedule[0]?.pause,
    duration: data?.schedule[0]?.duration,
    train_id: data?.schedule[0]?.train_id,
    station_id: data?.schedule[0]?.station_id,
  };

  if (typeof window !== "undefined" && !loading && !data?.schedule?.length) notFound();

  return (
    <div className="mt-5 flex h-full flex-col justify-center">
      <Form
        refetchQueries={[{ query: ScheduleDocument }]}
        fields={["station_id", "train_id", "pause", "duration"]}
        mutation={UpdateScheduleDocument}
        defaultValues={defaultValues}
        afterSubmit={() => router.push("/schedule")}
      />
    </div>
  );
};

export default EditSchedule;
