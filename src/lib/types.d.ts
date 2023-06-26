import { z } from "zod";
import { type Table } from "@tanstack/react-table";

// :::| Temporary Dev Tool
export interface pseudoServerReturn<TData> {
	status: number;
	statusText: string;
	data: TData;
}

export type VezraUser = {
	id: string | undefined;
	username: string | null | undefined;
	firstName: string | null | undefined;
	lastName: string | null | undefined;
	fullName: string | null | undefined;
	profileImageUrl: string | undefined;
	role: "Administrator" | "Staff" | undefined;
};

export type useVezraUserReturn = {
	userIsLoaded: boolean | undefined;
	userIsSignedIn: boolean | undefined;
	user: VezraUser;
};

export type StudentPageContextProps = {
	data: StudentTableData[];
	children: React.ReactNode;
};

export type StudentsPageReducerAction = {
	type: "SET_TABLE_DATA" | "SET_GLOBAL_FILTER" | "SET_SORTING";
	payload: unknown;
};

export const ZodVezraSortingState = z.object({
	id: z.string(),
	desc: z.boolean(),
});
export type VezraSortingState = z.infer<typeof ZodVezraSortingState>;

export const ZodStudentTableData = z.object({
	lastName: z.string(),
	firstName: z.string(),
	grade: z.string(),
	homeroom: z.string(),
});
export type StudentTableData = z.infer<typeof ZodStudentTableData>;

export const ZodStudentPageContext = z.object({
	table: z.object(), // <<--| typeof Table
	tableData: z.array(ZodStudentTableData),
	globalFilter: z.string(),
	sorting: z.array(ZodVezraSortingState),
});
export type StudentPageContext = z.infer<typeof ZodStudentPageContext>;
