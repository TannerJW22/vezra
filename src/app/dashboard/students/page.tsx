import type { ColumnDef, Student } from "@/lib/types";

import { Sheet } from "@/components/_(shadcn-ui)/_sheet";
import AddStudentSheet from "./AddStudentSheet";
import StudentTable from "./StudentTable";

// -=-=-= Types -=-=-= //
type StudentPageProps = {
  //
};

// =-=-=- Main Component =-=-=- //
export default function StudentsPage({}: StudentPageProps) {
  const columns: ColumnDef<Partial<Student>>[] = [
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

  return (
    <main className="bg-light-200 py-3 pl-3 pr-4 h-[100%]">
      <Sheet>
        <StudentTable columns={columns} />
        <AddStudentSheet />
      </Sheet>
    </main>
  );
}
