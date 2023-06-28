// "@/app/..."
import { ZodSignInFormSchema } from "@/app/SignInForm";

// "@/models/..."
import { ZodStudent } from "@/models/Student";

// "@/store/..."
/////

// "@/app/dashboard/students/..."
import { ZodAddStudentFormSchema } from "@/app/dashboard/students/AddStudentForm";
import { ZodStudentTableData } from "@/app/dashboard/students/page";

export { ZodAddStudentFormSchema, ZodSignInFormSchema, ZodStudent, ZodStudentTableData };
