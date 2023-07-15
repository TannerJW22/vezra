import dbConnect from "@/lib/mongoDB";
import { AddStudentForm } from "@/lib/types";
import { Student } from "@/models/Student";
import { NextResponse } from "next/server";

// :::
export async function GET(request: Request, _: Response) {
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
export async function POST(request: Request, _: Response) {
  let newStudent;

  // Parse the body from Readable Stream using OoB MDN method.
  const reqBody: AddStudentForm = await request.json();

  try {
    //
    await dbConnect();
    newStudent = await Student.create<AddStudentForm>(reqBody);
  } catch (err) {
    // Error Handling
    return NextResponse.json(
      {
        message: "error",
        data: null,
      },
      {
        status: 500,
      }
    );
  }

  // onSuccess
  return NextResponse.json(
    {
      message: `New student successfully created: ${reqBody.firstName} ${reqBody.lastName}`,
      data: { newStudent },
    },
    {
      status: 200,
    }
  );
}
