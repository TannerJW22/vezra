import {
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/_(shadcn-ui)/_sheet";
import AddStudentForm from "./AddStudentForm";

// -=-=-= Types -=-=-= //
type AddStudentSheetProps = {
  //
};

// =-=-=- Main Component =-=-=- //
export default function AddStudentSheet({}: AddStudentSheetProps) {
  const postNewStudent = async () => {
    "use server";
  };

  return (
    <div>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Add New Student</SheetTitle>
          <AddStudentForm postNewStudent={postNewStudent} />
        </SheetHeader>
      </SheetContent>
    </div>
  );
}
