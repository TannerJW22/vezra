import type { Table, ZodType, VezraSortingState, StudentTableData } from "@/lib/types";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { z } from "zod";

// -=-=-= Types & Validators -=-=-= //
export const ZodStudentTableData = z.object({
	lastName: z.string(),
	firstName: z.string(),
	grade: z.string(),
	homeroom: z.string(),
});
export type StudentTableData = z.infer<typeof ZodStudentTableData>;

export const ZodVezraSortingState = z.object({
	id: z.string(),
	desc: z.boolean(),
});
export type VezraSortingState = z.infer<typeof ZodVezraSortingState>;

export const ZodStudentPageSlice = z.object({
	table: z.unknown() as ZodType<Table<StudentTableData[]>>,
	tableData: z.array(ZodStudentTableData),
	globalFilter: z.string(),
	sorting: z.array(ZodVezraSortingState),
});
export type StudentPageSlice = z.infer<typeof ZodStudentPageSlice>;

// =-=-=- Slice Declaration =-=-=- //
const initialState: StudentPageSlice = {
	table: {} as StudentPageSlice["table"],
	tableData: [],
	globalFilter: "",
	sorting: [],
};

export const studentPageSlice = createSlice({
	name: "studentPage",
	initialState,
	reducers: {
		setTableData: (state: StudentPageSlice, action: PayloadAction<StudentTableData[]>) => {
			state.tableData = action.payload;
		},

		setGlobalFilter: (state: StudentPageSlice, action: PayloadAction<string>) => {
			state.globalFilter = action.payload;
		},

		setSorting: (state: StudentPageSlice, action: PayloadAction<VezraSortingState[]>) => {
			state.sorting = action.payload;
		},
		setTable: (state: StudentPageSlice, action: PayloadAction<Table<StudentTableData>>) => {
			state.table = action.payload;
		},
	},
});

export const studentPageReducer = studentPageSlice.reducer;
export const { setTableData, setGlobalFilter, setSorting, setTable } = studentPageSlice.actions;
