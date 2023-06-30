// "@/app/..."
import { ZodSignInFormData } from "@/app/SignInForm";

// "@/models/..."
import { ZodContact } from "@/models/Contact";
import { ZodStudent } from "@/models/Student";

// "@/app/dashboard/students/..."
import { ZodAddStudentForm } from "@/app/dashboard/students/AddStudentForm";
import { ZodStudentTableData } from "@/app/dashboard/students/page";

export {
  ZodSignInFormData,
  ZodAddStudentForm,
  ZodStudentTableData,
  ZodStudent,
  ZodContact,
};
