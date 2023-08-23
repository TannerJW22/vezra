import {
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/_(shadcn-ui)/_sheet";
import { UseQueryResult } from "@tanstack/react-query";
import AddStudentForm from "./AddStudentForm";
import { StudentTableData } from "./StudentTable";

// -=-=-= Types -=-=-= //
type AddStudentSheetProps = {
  query: UseQueryResult<StudentTableData[], Error>;
};

// =-=-=- Main Component =-=-=- //
export default function AddStudentSheet({ query }: AddStudentSheetProps) {
  return (
    <div>
      <SheetContent side="right" className="min-w-[450px]">
        <SheetHeader>
          <SheetTitle className="pt-2 pl-10 text-[22px]">
            Add New Student
          </SheetTitle>
          <AddStudentForm query={query} />
        </SheetHeader>
      </SheetContent>
    </div>
  );
}
