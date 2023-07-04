import { NextResponse } from "next/server";

export async function GET(req: Request) {
  let students;
  // const res = await Student.find();
  const res = await fetch("http://jsonplaceholder.typicode.com/users", {
    method: "GET",
  }).then((data) => (students = data));

  return NextResponse.json(students);
}
