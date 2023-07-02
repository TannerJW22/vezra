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
import type { FieldError } from "react-hook-form";
import type { TypedUseSelectorHook } from "react-redux";
import type { ZodType } from "zod";

// "@/app/..."
import type { SignInFormData } from "@/app/SignInForm";

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
import type { Theme } from "@/lib/constants";

// "@/lib/utils/..."
import type { pseudoServerReturn } from "@/lib/utils";

// "@/components/..."
import type { InputProps } from "@/components/(inputs)/Input";

// "@/app/dashboard/students/..."
import type { StudentTableData } from "@/app/dashboard/students/page";

// ::: Exports

// External Library Types
export type {
  ColumnDef,
  ZodType,
  FieldError,
  ClassValue,
  Table,
  TypedUseSelectorHook,
};
// Internal Custom Types
export type {
  InputProps,
  Theme,
  ColumnSort,
  SortingState,
  FilterFn,
  StudentTableData,
  RootState,
  VezraDispatch,
  VezraUser,
  useVezraUserReturn,
  pseudoServerReturn,
  SignInFormData,
  StudentTableData,
  SignInFormData,
  Student,
  AncestryEnum,
  GenderEnum,
  GradeEnum,
  LockerLocationEnum,
  Contact,
};
