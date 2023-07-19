import { z } from "zod";

const ZodStudentTableData = z.object({
  _id: z.string(),
  lastName: z.string(),
  firstName: z.string(),
  grade: z.string(),
  homeroom: z.string(),
});

export default ZodStudentTableData;
