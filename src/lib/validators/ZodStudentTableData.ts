import ZodStudent from "./ZodStudent";

const ZodStudentTableData = ZodStudent.pick({
  _id: true,
  lastName: true,
  firstName: true,
  grade: true,
  homeroom: true,
});

export default ZodStudentTableData;
