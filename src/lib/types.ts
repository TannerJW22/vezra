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
import type { Control, FieldError, FieldValues } from "react-hook-form";
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
import type { InputProps } from "@/components/(inputs)/Input";

// "@/app/dashboard/students/..."
import type { StudentTableData } from "@/app/dashboard/students/StudentTable";

// ::: Exports

// External Library Types
export type {
  ColumnDef,
  ZodType,
  FieldError,
  Control,
  FieldValues,
  ClassValue,
  Table,
  TypedUseSelectorHook,
};
// Internal Custom Types
export type {
  StudentTableData,
  InputProps,
  Theme,
  ColumnSort,
  SortingState,
  FilterFn,
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
