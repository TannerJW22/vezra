// ::: Imports

// External Library Types
import type { FieldError } from "react-hook-form";
import type { ClassValue } from "clsx";
import type { Table, ColumnDef } from "@tanstack/react-table";
import type { TypedUseSelectorHook } from "react-redux";
import type { ZodType } from "zod";

// "@/app/..."
import type { SignInFormData } from "@/app/SignInForm";

// "@/models/..."
import type { Student, LockerLocationEnum, GenderEnum, AncestryEnum } from "@/models/Student";

// "@/hooks/..."
import type { VezraUser, useVezraUserReturn } from "@/hooks/useVezraUser";

// "@/store/..."
import type { RootState, VezraDispatch } from "@/store/index";
import type { StudentPageSlice } from "@/store/slices/studentPageSlice";

// "@/lib/utils/..."
import type { pseudoServerReturn } from "@/lib/utils";

// "@/app/dashboard/students/..."
import type {
	VezraSortingState,
	StudentTableData,
	AddStudentFormSchema,
} from "@/app/dashboard/students/AddStudentForm";

// ::: Exports

// External Library Types
export { ColumnDef, ZodType, FieldError, ClassValue, Table, TypedUseSelectorHook };

// Internal Custom Types
export {
	VezraSortingState,
	StudentTableData,
	StudentPageContext,
	RootState,
	VezraDispatch,
	VezraUser,
	useVezraUserReturn,
	pseudoServerReturn,
	SignInFormData,
	StudentTableData,
	Student,
	LockerLocationEnum,
	GenderEnum,
	AncestryEnum,
};

////////////////////////////////
////////////////////////////////

export type StudentsPageReducerAction = {
	type: "SET_TABLE_DATA" | "SET_GLOBAL_FILTER" | "SET_SORTING";
	payload: unknown;
};
