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
  return (
    <div>
      <SheetContent side="right" className="min-w-[450px]">
        <SheetHeader>
          <SheetTitle>Add New Student</SheetTitle>
          <AddStudentForm />
        </SheetHeader>
      </SheetContent>
    </div>
  );
}
