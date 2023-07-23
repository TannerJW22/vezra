import { VezraError } from "@/lib/helpers";
import dbConnect from "@/lib/mongoDB";
import { AddStudentForm, StudentTableData } from "@/lib/types";
import {
  ZodAddStudentForm,
  ZodStudent,
  ZodStudentTableData,
} from "@/lib/validators";
import { Student } from "@/models/Student";
import { NextResponse } from "next/server";
import { z } from "zod";

// :::
export async function GET(request: Request, _: Response) {
  let students: StudentTableData[];

  try {
    await dbConnect();
    const res = await Student.find({}, [
      "_id",
      "lastName",
      "firstName",
      "grade",
      "homeroom",
    ]);
    students = z.array(ZodStudentTableData).parse(res);
    //
  } catch (err) {
    // Error Handling
    return NextResponse.json(VezraError.parse(err), {
      statusText: "error",
      status: 500,
    });
  }

  // onSuccess
  return NextResponse.json(
    {
      students,
    },
    {
      statusText: "success",
      status: 200,
    }
  );
}

// :::
export async function POST(request: Request, _: Response) {
  let newStudent: AddStudentForm | Partial<Student>;

  // Parse the body from Readable Stream using OoB MDN method.
  let reqBody: AddStudentForm = await request.json();

  try {
    //
    await dbConnect();
    reqBody = ZodAddStudentForm.parse(reqBody);
    const res: Student = await Student.create<AddStudentForm>(reqBody);
    newStudent = ZodStudent.parse(res);

    //
  } catch (err) {
    // Error Handling
    return NextResponse.json(
      {
        error: "Internal Server Error.",
      },
      {
        statusText: "error",
        status: 500,
      }
    );
  }

  // onSuccess
  return NextResponse.json(
    {
      newStudent,
    },
    {
      statusText: "success",
      status: 200,
    }
  );
}
