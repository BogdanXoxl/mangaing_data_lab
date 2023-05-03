"use client";

import { useQuery } from "@apollo/client";
import type { SortingState } from "@tanstack/react-table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import type { ScheduleList } from "@/app/schedule/gql";
import { ScheduleListDocument } from "@/app/schedule/gql";
import type { ArrayElement } from "@/types/ArrayElement";

import type { SortScheduleField } from "../../../generated/__generated__/gql-codegen/types";
import { SortDirection } from "../../../generated/__generated__/gql-codegen/types";

type ScheduleType = ArrayElement<ScheduleList["schedule"]>;

const columnHelper = createColumnHelper<ScheduleType>();

const columns = [
  columnHelper.accessor((row) => row?.station_id, {
    id: "station_id",
    header: "Код станции",
  }),
  columnHelper.accessor((row) => row?.train_id, {
    id: "train_id",
    header: "Номер поезда",
  }),
  columnHelper.accessor((row) => row?.pause, {
    id: "pause",
    header: "Стоянка",
  }),
  columnHelper.accessor((row) => row?.duration, {
    id: "duration",
    header: "Время в пути",
  }),
];

const SchedulePage = () => {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data, refetch } = useQuery(ScheduleListDocument);

  useEffect(() => {
    refetch(
      sorting.length
        ? {
            sort: {
              sort_direction: sorting?.at(0)?.desc ? SortDirection.Desc : SortDirection.Asc,
              field: sorting?.at(0)?.id as SortScheduleField,
            },
          }
        : {}
    );
  }, [refetch, sorting]);

  const table = useReactTable({
    data: data?.schedule || [],
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="my-4 flex h-full flex-col justify-center">
      <div className="mx-auto w-full max-w-2xl rounded-sm border border-gray-200 bg-white shadow-lg">
        <header className="border-b border-gray-100 px-5 py-4">
          <div className="font-semibold text-gray-800">Расписание</div>
        </header>

        <div className="overflow-x-auto p-3">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="p-2">
                      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                      <div
                        className={`text-left font-semibold ${
                          header.column.getCanSort() ? "cursor-pointer select-none" : ""
                        }`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  ))}
                  <th aria-label="action" className="p-2" />
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-primary/50"
                  onClick={() => router.push(`schedule/${row.original?.id}`)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                  <td className="p-2">
                    <div className="flex justify-center">
                      <button type="button">
                        <svg
                          className="h-8 w-8 rounded-full p-1 hover:bg-gray-100 hover:text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
// TODO:: server fetch
// TODO:: filters
// TODO:: test sort
