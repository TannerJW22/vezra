import { SheetContent, SheetHeader, SheetTitle } from "@/components/_(shadcn-ui)/_sheet";
import AddStudentForm from "@/app/dashboard/students/AddStudentForm";

export default function AddStudentSheet({}: AddStudentSheetProps) {
	const postNewStudent = async () => {};

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

export type AddStudentSheetProps = {
	//
};
