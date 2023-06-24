import { NextResponse } from "next/server";
import { pseudoServer } from "@/lib/utils";

export async function GET(req: Request) {
	const fakeData = [
		{
			firstName: "Tanner",
			lastName: "Linsley",
			grade: "3",
			homeroom: "Santerre",
		},
		{
			firstName: "Tandy",
			lastName: "Miller",
			grade: "1",
			homeroom: "White",
		},
		{
			firstName: "Jose",
			lastName: "Canstellionso",
			grade: "4",
			homeroom: "Staggs",
		},
		{
			firstName: "John",
			lastName: "Doe",
			grade: "2",
			homeroom: "Smith",
		},
		{
			firstName: "Jaasdne",
			lastName: "Smasith",
			grade: "5",
			homeroom: "Johsnson",
		},
		{
			firstName: "Tar",
			lastName: "Ly",
			grade: "3",
			homeroom: "Santre",
		},
		{
			firstName: "Tady",
			lastName: "Mer",
			grade: "1",
			homeroom: "Whe",
		},
		{
			firstName: "Jasdasde",
			lastName: "Canasdonso",
			grade: "4",
			homeroom: "Stags",
		},
		{
			firstName: "Joofgdfghn",
			lastName: "Doasde",
			grade: "2",
			homeroom: "Smiasdth",
		},
		{
			firstName: "Jaasdsdne",
			lastName: "Smasdfdith",
			grade: "5",
			homeroom: "Johasdfdasdnson",
		},
		{
			firstName: "T3ady",
			lastName: "Mer",
			grade: "1",
			homeroom: "Whe",
		},
		{
			firstName: "Jasdsdasde",
			lastName: "Caaaanasdonso",
			grade: "4",
			homeroom: "Sta34gs",
		},
		{
			firstName: "Joofgdfghn",
			lastName: "Doasde",
			grade: "2",
			homeroom: "Smiasdth",
		},
		{
			firstName: "Jaasdne",
			lastName: "Smasdith",
			grade: "5",
			homeroom: "Johasdasdnson",
		},
	];

	const students = await pseudoServer(fakeData, 1500);
	return NextResponse.json(students);
}
