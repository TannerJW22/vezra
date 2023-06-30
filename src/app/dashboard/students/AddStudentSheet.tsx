import AddStudentForm from "./AddStudentForm";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/_(shadcn-ui)/_sheet";

// -=-=-= Types -=-=-= //
type AddStudentSheetProps = {
	//
};

// =-=-=- Main Component =-=-=- //
export default function AddStudentSheet({}: AddStudentSheetProps) {
	const postNewStudent = async () => {};

	return (
		<div>
			<SheetContent side="right">
				<SheetHeader>
					<SheetTitle>Add New Student</SheetTitle>
					{/* <AddStudentForm postNewStudent={postNewStudent} /> */}
				</SheetHeader>
			</SheetContent>
		</div>
	);
}
