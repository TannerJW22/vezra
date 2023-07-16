// ::: Imports

// External Library Types
import type {
  ColumnDef,
  ColumnSort,
  FilterFn,
  SortingState,
  Table,
} from "@tanstack/react-table";
import type { ClassValue } from "clsx";
import type {
  Control,
  FieldError,
  FieldValues,
  Path,
  PathValue,
  SubmitHandler,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import type { TypedUseSelectorHook } from "react-redux";
import type { ZodType } from "zod";

// "@/app/..."

// "@/models/..."
import type { Contact } from "@/models/Contact";
import type {
  AncestryEnum,
  GenderEnum,
  GradeEnum,
  LockerLocationEnum,
  Student,
} from "@/models/Student";

// "@/hooks/..."
import type { VezraUser, useVezraUserReturn } from "@/hooks/useVezraUser";

// "@/store/..."
import type { RootState, VezraDispatch } from "@/store/index";

// "@/lib/constants/..."
import type { Theme } from "@/app/ThemeProvider";

// "@/lib/utils/..."

// "@/components/..."

// "@/app/dashboard/students/..."
import type {
  AddStudentForm,
  VezraError,
} from "@/app/dashboard/students/AddStudentForm";
import type { StudentTableData } from "@/app/dashboard/students/StudentTable";

// ::: Exports

// External Library Types
export type {
  SubmitHandler,
  ColumnDef,
  ZodType,
  FieldError,
  Control,
  FieldValues,
  ClassValue,
  Table,
  TypedUseSelectorHook,
  UseFormWatch,
  UseFormSetValue,
  Path,
  PathValue,
  FilterFn,
};
// Internal Custom Types
export type {
  StudentTableData,
  Theme,
  ColumnSort,
  SortingState,
  AddStudentForm,
  VezraError,
  RootState,
  VezraDispatch,
  VezraUser,
  useVezraUserReturn,
  Student,
  AncestryEnum,
  GenderEnum,
  GradeEnum,
  LockerLocationEnum,
  Contact,
};
