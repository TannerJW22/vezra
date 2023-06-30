import {
  _ancestryEnum,
  _genderEnum,
  _lockerlocationEnum,
} from "@/models/Student";
import { z } from "zod";

// "@/app/..."
const ZodSignInFormData = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
});

// "@/models/..."
const ZodStudent = z.object({
  lastName: z.string(),
  firstName: z.string(),
  grade: z.string(),
  dateEnrolled: z.date(),
  homeroom: z.string().optional(),
  lockerNumber: z.string().optional(),
  lockerLocation: z.enum(_lockerlocationEnum).optional(),
  daysAbsent: z.number().optional(),
  dateExit: z.date().optional(),
  hasLep: z.boolean().optional(),
  canPhoto: z.boolean().optional(),
  bbcid: z.string().optional(),
  sasid: z.string().optional(),
  lasid: z.string().optional(),
  livesWithBothParents: z.boolean().optional(),
  lastSchoolName: z.string().optional(),
  phone: z.number().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.number().optional(),
  dob: z.date().optional(),
  ssn: z.number().optional(),
  gender: z.enum(_genderEnum).optional(),
  ancestry: z.enum(_ancestryEnum).optional(),
  notes: z.string().optional(),
  // contactIds: z.array(contactSchema).optional(), // <<--|
  createdAt: z.date().optional(), // <<--|
  updatedAt: z.date().optional(), // <<--|
});

// "@/app/dashboard/students/..."
const ZodAddStudentForm = z.object({
  // username: z.string().nonempty(),
  // password: z.string().nonempty(),
});

const ZodStudentTableData = z.object({
  lastName: z.string(),
  firstName: z.string(),
  grade: z.string(),
  homeroom: z.string(),
});

export {
  ZodAddStudentForm,
  ZodSignInFormData,
  ZodStudent,
  ZodStudentTableData,
  _ancestryEnum,
  _genderEnum,
  _lockerlocationEnum,
};
