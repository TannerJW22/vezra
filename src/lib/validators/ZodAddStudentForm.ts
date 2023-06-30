import { z } from "zod";

const ZodAddStudentForm = z.object({
  // username: z.string().nonempty(),
  // password: z.string().nonempty(),
});

export default ZodAddStudentForm;
