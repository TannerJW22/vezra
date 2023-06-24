"use client";

import { ColumnDef } from "@tanstack/react-table";
import { type Student } from "@/models/Student";

export const columns: ColumnDef<Partial<Student>>[] = [
	{
		accessorKey: "lastName",
		header: "Last Name",
	},
	{
		accessorKey: "firstName",
		header: "First Name",
	},
	{
		accessorKey: "grade",
		header: "Grade",
	},
	{
		accessorKey: "homeroom",
		header: "Homeroom",
	},
];
