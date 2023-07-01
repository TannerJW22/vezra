import ZodStudent from "./ZodStudent";

const ZodAddStudentForm = ZodStudent.pick({
  lastName: true,
  firstName: true,
  grade: true,
  dateEnrolled: true,
});

export default ZodAddStudentForm;
