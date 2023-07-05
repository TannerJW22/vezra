"use client";

import { _baseURL_ } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// =-=-=- Main Component =-=-=- //
export default function ClassesPage() {
  const {
    data: students,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getAllStudents"],
    queryFn: () =>
      axios.get(`${_baseURL_}/api/students`).then((res) => res.data.students),
  });

  if (isLoading) {
    console.log("Students is Loading...");
    return <p>Loading...</p>;
  }
  if (!isLoading) console.log("Students >> ", students); // <<--*

  return (
    //
    //
    <main className="p-5">
      <div>{JSON.stringify(students)}</div>
    </main>
  );
}
