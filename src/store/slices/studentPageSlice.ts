import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { z } from "zod";
import {
	type StudentPageContext,
	type StudentTableData,
	type VezraSortingState,
} from "@/lib/types.d";
import { Table } from "@tanstack/react-table";

const initialState: StudentPageContext = {
	table: {},
	tableData: [],
	globalFilter: "",
	sorting: [],
};

export const studentPageSlice = createSlice({
	name: "studentPage",
	initialState,
	reducers: {
		setTableData: (state: StudentPageContext, action: PayloadAction<StudentTableData[]>) => {
			state.tableData = action.payload;
		},

		setGlobalFilter: (state: StudentPageContext, action: PayloadAction<string>) => {
			state.globalFilter = action.payload;
		},

		setSorting: (state: StudentPageContext, action: PayloadAction<VezraSortingState[]>) => {
			state.sorting = action.payload;
		},
		setTable: (state: StudentPageContext, action: PayloadAction<Table<StudentTableData>>) => {
			state.table = action.payload;
		},
	},
});

export const studentPageReducer = studentPageSlice.reducer;
export const { setTableData, setGlobalFilter, setSorting, setTable } = studentPageSlice.actions;
