"use client";

import { Student } from "@/lib/types";
import { _baseURL_ } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// -=-=-= Types & Validators -=-=-= //
type StudentDetailPageProps = {
  params: any;
};

// =-=-=- Main Component =-=-=- //
export default function StudentDetailPage({ params }: StudentDetailPageProps) {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: (): Promise<Student> => {
      return axios.get(`${_baseURL_}/api/student/${params.id}`).then((res) => {
        return res.data.students;
      });
    },
  });

  return (
    //
    //
    <main>{JSON.stringify(params)}</main>
  );
}
