import { ZodContact } from "@/lib/validators";
import { z } from "zod";

const gradeEnum = ["K", "1", "2", "3", "4", "5"] as const;
const lockerlocationEnum = ["Main", "Addition"] as const;
const genderEnum = ["Male", "Female", "Other"] as const;
const ancestryEnum = [
  "White",
  "Hispanic",
  "Asian",
  "Black",
  "American Indian/Alaskan Native",
  "NativeHawaiian/OtherPacific",
] as const;

const ZodStudent = z.object({
  _id: z.unknown(),
  lastName: z
    .string({
      invalid_type_error: "Valid Last Name is required.",
    })
    .nonempty({
      message: "Valid Last Name is required.",
    }),
  firstName: z
    .string({
      invalid_type_error: "Valid First Name is required.",
    })
    .nonempty({
      message: "Valid First Name is required.",
    }),
  grade: z.enum(gradeEnum, {
    errorMap: (issue, _ctx) => {
      return {
        message: "Valid Grade is required",
      };
    },
  }),
  dateEnrolled: z.date({
    invalid_type_error: "Valid Date is required.",
    required_error: "Valid Date is required.",
  }),
  homeroom: z.string().optional(),
  lockerNumber: z.string().optional(),
  lockerLocation: z.enum(lockerlocationEnum).optional(),
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
  gender: z.enum(genderEnum).optional(),
  ancestry: z.enum(ancestryEnum).optional(),
  notes: z.string().optional(),
  contacts: z.array(z.lazy(() => ZodContact)).optional(), // <<--|
  createdAt: z.date().optional(), // <<--|
  updatedAt: z.date().optional(), // <<--|
});

export default ZodStudent;
export { ancestryEnum, gradeEnum, genderEnum, lockerlocationEnum };
