import { type Student } from "@/models/Student";

import { columns } from "./columns";
import StudentTable from "@/app/dashboard/students/StudentTable";
import AddStudentSheet from "@/app/dashboard/students/AddStudentSheet";
import StudentTableToolbar from "@/app/dashboard/students/StudentTableToolbar";
import { Sheet as SheetProvider } from "@/components/_(shadcn-ui)/_sheet";
import { createContext, useReducer } from "react";
import { SortingState } from "@tanstack/react-table";

// :::|
async function getStudentTable(): Promise<Partial<Student>[]> {
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

	return students;
}

// :::
export default async function StudentsPage() {
	const data: Awaited<Partial<Student>[]> = await getStudentTable();

	const ctx = createContext({
		tableData: [...data],
		globalFilter: "",
		sorting: [],
	});

	const reducer = (
		state: StudentsPageReducerState,
		{ type, payload }: StudentsPageReducerAction,
	) => {
		switch (type) {
			case "SET_TABLE_DATA":
				_evalForCase1_;
				break;
			case "SET_GLOBAL_FILTER":
				_evalForCase1_;
				break;
			case "SET_SORTING":
				_evalForCase1_;
				break;
			default:
				return null;
		}
	};

	const [state, dispatch] = useReducer(reducer, ctx); // <<--| Wrap in custom provider so this page can be RSC?

	const refresh = useReducer(() => ({}), {})[1];

	return (
		<main className="py-3 pl-3 pr-4">
			<SheetProvider>
				<div className="p-5 h-[81vh] bg-white border-t shadow-md">
					<StudentTableToolbar />
					<StudentTable columns={columns} _data={data} />
				</div>
				<AddStudentSheet />
			</SheetProvider>
		</main>
	);
}

// :::* Types
export interface StudentsPageReducerState {
	tableData: Partial<Student>[];
	globalFilter: string;
	sorting: SortingState[];
}
export interface StudentsPageReducerAction {
	type: "SET_TABLE_DATA" | "SET_GLOBAL_FILTER" | "SET_SORTING";
	payload: any;
}
