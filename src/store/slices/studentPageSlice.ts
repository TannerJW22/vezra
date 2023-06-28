// import type { Table, ZodType } from "@/lib/types";

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { z } from "zod";

// // -=-=-= Types & Validators -=-=-= //

// // =-=-=- Slice Declaration =-=-=- //
// const initialState = {
// 	table: {},
// 	tableData: [],
// };

// export const studentPageSlice = createSlice({
// 	name: "studentPage",
// 	initialState,
// 	reducers: {
// 		setTableData: (state: StudentPageSlice, action: PayloadAction<StudentTableData[]>) => {
// 			state.tableData = action.payload;
// 		},

// 		setTable: (state: StudentPageSlice, action: PayloadAction<Table<StudentTableData>>) => {
// 			state.table = action.payload;
// 		},
// 	},
// });

// export const studentPageReducer = studentPageSlice.reducer;
// export const { setTableData, setTable } = studentPageSlice.actions;
