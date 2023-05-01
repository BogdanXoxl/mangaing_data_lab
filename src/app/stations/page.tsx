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

import type { ArrayElement } from "@/types/ArrayElement";

import type { SortStationsField } from "../../../generated/__generated__/gql-codegen/types";
import { SortDirection } from "../../../generated/__generated__/gql-codegen/types";
import type { StationsList } from "./gql";
import { StationsListDocument } from "./gql";

type StationsType = ArrayElement<StationsList["stations"]>;

const columnHelper = createColumnHelper<StationsType>();

const columns = [
  columnHelper.accessor((row) => row?.name, {
    id: "name",
    header: "Наименование станции",
  }),
  columnHelper.accessor((row) => row?.station_form, {
    id: "station_form",
    header: "Форма станции",
  }),
];

const StationsPage = () => {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data, refetch } = useQuery(StationsListDocument);

  useEffect(() => {
    refetch(
      sorting.length
        ? {
            sort: {
              sort_direction: sorting?.at(0)?.desc ? SortDirection.Desc : SortDirection.Asc,
              field: sorting?.at(0)?.id as SortStationsField,
            },
          }
        : {}
    );
  }, [refetch, sorting]);

  const table = useReactTable({
    data: data?.stations || [],
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="my-4 flex h-full flex-col justify-center">
      <div className="mx-auto w-full max-w-2xl rounded-sm border border-gray-200 bg-white shadow-lg">
        <header className="border-b border-gray-100 px-5 py-4">
          <div className="font-semibold text-gray-800">Станции</div>
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
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-primary/50"
                  onClick={() => router.push(`stations/${row.original?.id}`)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StationsPage;
