import type { AddStudentForm, GradeEnum } from "@/lib/types";

import dbConnect from "@/lib/mongoDB";
import { Student } from "@/models/Student";
import { NextResponse } from "next/server";

// :::
export async function GET(req: Request) {
  let students;

  try {
    await dbConnect();
    const res = await Student.find();
    students = res;
  } catch (err) {
    console.error(err);
  }

  return NextResponse.json({ students });
}

// :::
export async function POST(req: Request) {
  let newStudent;
  console.log(req); // <<--*

  try {
    await dbConnect();
    const res = await Student.create<AddStudentForm>({
      lastName: "TestLastName",
      firstName: "TestFirstName",
      grade: "3" as GradeEnum,
      dateEnrolled: new Date(),
    });
    newStudent = res;
  } catch (err) {
    console.error(err);
  }

  return NextResponse.json({
    newStudent,
  });
}
