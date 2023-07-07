"use client";

import type { ColumnDef, FilterFn, SortingState, Student } from "@/lib/types";

import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import {
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { z } from "zod";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/_(shadcn-ui)/_table";
import StudentTableToolbar from "./StudentTableToolbar";

import { _baseURL_, cn } from "@/lib/utils";
import { ZodStudentTableData } from "@/lib/validators";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";

// -=-=-= Types -=-=-= //

export type StudentTableData = z.infer<typeof ZodStudentTableData>;
declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

type StudentTableProps = {
  columns: ColumnDef<Partial<Student>>[];
};

// =-=-=- Main Component =-=-=- //
export default function StudentTable({ columns }: StudentTableProps) {
  const [tableData, setTableData] = useState<StudentTableData[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filter, setFilter] = useState("");

  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the itemRank info
    addMeta({
      itemRank,
    });

    // Return if the item should be filtered in/out
    return itemRank.passed;
  };

  const table = useReactTable({
    data: tableData,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      globalFilter: filter,
      sorting,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getAllStudents"],
    queryFn: () =>
      axios
        .get(`${_baseURL_}/api/students`)
        .then((res) => setTableData(res.data.students)),
  });

  if (isLoading) {
    console.log("Students is Loading...");
    return <p>Loading...</p>;
  }
  if (!isLoading) console.log("Students >> ", data); // <<--*

  const renderSortingIcon = (sortStatus: "asc" | "desc" | "") => {
    switch (sortStatus) {
      case "asc":
        return (
          <BsArrowUpShort className="text-zinc-600 border rounded-full hover:bg-light-200 w-7 h-7" />
        );
        break;
      case "desc":
        return (
          <BsArrowDownShort className="text-zinc-600 border rounded-full hover:bg-light-200 w-7 h-7" />
        );
        break;
      default:
        null;
    }
  };

  return (
    <main className="p-5 bg-white shadow-md w-full h-[99%]">
      <div className="px-3 pl-3 pr-8 flex flex-col gap-3 w-[85%]">
        <StudentTableToolbar
          table={table}
          filter={filter}
          setFilter={setFilter}
          setSorting={setSorting}
        />
        <Table className="rounded-md border">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="bg-light-100" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className={cn(
                        "hover:bg-zinc-100 cursor-pointer select-none",
                        header.column.getIsSorted() &&
                          "bg-zinc-100 border-b-[2.5px] border-zinc-400"
                      )}
                      onClick={() => header.column.toggleSorting()}
                      key={header.id}
                    >
                      <div className="relative py-2 pl-1 flex gap-4 items-center text-zinc-600">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        <div className="absolute right-[25%]">
                          {renderSortingIcon(
                            String(header.column.getIsSorted()) as
                              | "asc"
                              | "desc"
                              | ""
                          )}
                        </div>
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="z-30 cursor-pointer select-none hover:bg-primary-50 hover:outline hover:outline-1 hover:outline-primary-100 hover:scale-[1.035] hover:translate-x-1 transition-all duration-200"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="p-2 max-w-[100px]" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
