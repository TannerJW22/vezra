"use client";

import type { ColumnDef, StudentTableData } from "@/lib/types";

import { Sheet } from "@/components/_(shadcn-ui)/_sheet";
import { _baseURL_ } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AddStudentSheet from "./AddStudentSheet";
import StudentTable from "./StudentTable";

// -=-=-= Types -=-=-= //
type StudentPageProps = {
  //
};

// =-=-=- Main Component =-=-=- //
export default function StudentsPage({}: StudentPageProps) {
  const columns: ColumnDef<StudentTableData, any>[] = [
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "grade",
      header: "Grade",
    },
    {
      accessorKey: "homeroom",
      header: "Homeroom",
    },
  ];

  const studentsQuery = useQuery<StudentTableData[], Error>({
    queryKey: ["students"],
    queryFn: async () => {
      return axios.get(`${_baseURL_}/api/students`).then((res) => {
        return res.data.data;
      });
    },
  });

  return (
    <main className="bg-light-200 py-3 pl-3 pr-4 h-[100%]">
      <Sheet>
        <StudentTable columns={columns} query={studentsQuery} />
        <AddStudentSheet query={studentsQuery} />
      </Sheet>
    </main>
  );
}
