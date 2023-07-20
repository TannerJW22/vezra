import dbConnect from "@/lib/mongoDB";
import { AddStudentForm } from "@/lib/types";
import { Student } from "@/models/Student";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

// -=-=-= Types -=-=-= //

// :::
export async function GET(_: Request, { params }: Params) {
  let student;

  try {
    await dbConnect();
    const res = await Student.findById(params.id);
    student = res;
  } catch (err) {
    // Error Handling
    return NextResponse.json(null, {
      statusText: "error",
      status: 500,
    });
  }

  // onSuccess
  return NextResponse.json(
    {
      student,
    },
    {
      statusText: "success",
      status: 200,
    }
  );
}

// ::: // <<--| In Progress
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
    return NextResponse.json(null, {
      statusText: "error",
      status: 500,
    });
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
