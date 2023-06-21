"use client";

import { ColumnDef } from "@tanstack/react-table";
import { type Student, ZodStudent } from "@/models/Student";

// Partial<Student> =
// {
// 	firstName: "Joe",
// 	lastName: "Cantellionso",
// 	grade: "4",
// 	homeroom: "Staggs",
// },

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
