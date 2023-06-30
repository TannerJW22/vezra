import { ZodContact } from "@/lib/validators";
import { z } from "zod";

const _lockerlocationEnum = ["Main", "Addition"] as const;
const _genderEnum = ["Male", "Female", "Other"] as const;
const _ancestryEnum = [
  "White",
  "Hispanic",
  "Asian",
  "Black",
  "American Indian/Alaskan Native",
  "NativeHawaiian/OtherPacific",
] as const;

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
  contacts: z.array(z.lazy(() => ZodContact)).optional(), // <<--|
  createdAt: z.date().optional(), // <<--|
  updatedAt: z.date().optional(), // <<--|
});

export default ZodStudent;
export { _ancestryEnum, _genderEnum, _lockerlocationEnum };
