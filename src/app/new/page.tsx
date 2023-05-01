"use client";

import { useRouter } from "next/navigation";

import { ScheduleDocument } from "@/app/schedule/[id]/gql";
import { StationDocument } from "@/app/stations/[id]/gql";
import { Form } from "@/components/Form";
import { Tabs } from "@/components/Tabs";

import { NewScheduleMutationDocument, NewStationMutationDocument } from "./gql";

const NewPage = () => {
  const router = useRouter();

  const tabs = {
    schedule: (
      <Form
        refetchQueries={[{ query: ScheduleDocument }]}
        fields={["station_id", "train_id", "pause", "duration"]}
        mutation={NewScheduleMutationDocument}
        afterSubmit={() => router.push("/schedule")}
      />
    ),

    stations: (
      <Form
        refetchQueries={[{ query: StationDocument }]}
        fields={["name", "station_form"]}
        mutation={NewStationMutationDocument}
        afterSubmit={() => router.push("/stations")}
      />
    ),
  };

  return (
    <div className="mt-5 flex h-full flex-col justify-center">
      <Tabs tabs={tabs} />
    </div>
  );
};

export default NewPage;
