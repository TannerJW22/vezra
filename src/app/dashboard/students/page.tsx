import StudentTable from "@/components/StudentTable";
import { type Student } from "@/models/Student";

export default function StudentPage() {
	const students: Partial<Student>[] = [
		{
			firstName: "Tanner",
			lastName: "Linsley",
			grade: "3",
			homeroom: "Santerre",
		},
		{
			firstName: "Tandy",
			lastName: "Miller",
			grade: "1",
			homeroom: "White",
		},
		{
			firstName: "Joe",
			lastName: "Cantellionso",
			grade: "4",
			homeroom: "Staggs",
		},
	];

	return (
		<main className="py-3 pl-3 pr-4">
			<div className="p-5 h-[81vh] bg-white border-t shadow-md">
				<StudentTable studentData={students} />
			</div>
		</main>
	);
}
