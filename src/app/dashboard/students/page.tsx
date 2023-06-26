import { columns } from "./columns";
import StudentTable from "@/app/dashboard/students/StudentTable";
import AddStudentSheet from "@/app/dashboard/students/AddStudentSheet";
import { type StudentTableData } from "@/lib/types";
import { Sheet } from "@/components/_(shadcn-ui)/_sheet";

// :::| Refactor to API call inside the RSC below
// async function getStudentTable(): Promise<StudentTableData[]> {
// 	return students;
// }

// const data: Awaited<StudentTableData[]> = await getStudentTable();

// :::
export default function StudentsPage() {
	const students: StudentTableData[] = [
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
			firstName: "Jose",
			lastName: "Canstellionso",
			grade: "4",
			homeroom: "Staggs",
		},
		{
			firstName: "John",
			lastName: "Doe",
			grade: "2",
			homeroom: "Smith",
		},
		{
			firstName: "Jaasdne",
			lastName: "Smasith",
			grade: "5",
			homeroom: "Johsnson",
		},
		{
			firstName: "Tar",
			lastName: "Ly",
			grade: "3",
			homeroom: "Santre",
		},
		{
			firstName: "Tady",
			lastName: "Mer",
			grade: "1",
			homeroom: "Whe",
		},
		{
			firstName: "Jasdasde",
			lastName: "Canasdonso",
			grade: "4",
			homeroom: "Stags",
		},
		{
			firstName: "Joofgdfghn",
			lastName: "Doasde",
			grade: "2",
			homeroom: "Smiasdth",
		},
		{
			firstName: "Jaasdsdne",
			lastName: "Smasdfdith",
			grade: "5",
			homeroom: "Johasdfdasdnson",
		},
		{
			firstName: "T3ady",
			lastName: "Mer",
			grade: "1",
			homeroom: "Whe",
		},
		{
			firstName: "Jasdsdasde",
			lastName: "Caaaanasdonso",
			grade: "4",
			homeroom: "Sta34gs",
		},
		{
			firstName: "Joofgdfghn",
			lastName: "Doasde",
			grade: "2",
			homeroom: "Smiasdth",
		},
		{
			firstName: "Jaasdne",
			lastName: "Smasdith",
			grade: "5",
			homeroom: "Johasdasdnson",
		},
	];

	return (
		<main className="bg-light-200 py-3 pl-3 pr-4 h-[100%]">
			<Sheet>
				<StudentTable columns={columns} _data={students} />
				<AddStudentSheet />
			</Sheet>
		</main>
	);
}
