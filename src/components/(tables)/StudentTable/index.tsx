"use client";

import {
	SortingState,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useReducer, useState } from "react";

import { type Student, ZodStudent } from "@/models/Student";
import { twMerge } from "tailwind-merge";
import { tailbreeze } from "tailbreeze";
import Toolbar from "./Toolbar";

const styles = {
	global: "border-y",
	header: "px-12 py-2 bg-primary-75 border-primary-75",
	body: "",
	footer: "",
	cell: tailbreeze({
		base: "w-full border-x border-light-200 py-2 rounded-md text-center text-[14px] tracking-tight",
		hover: "cursor-pointer",
	}),
};

// :::
export default function StudentTable({ studentData }: StudentTableProps) {
	const columnHelper = createColumnHelper<Partial<Student>>();

	const columns = [
		columnHelper.accessor("lastName", {
			header: "Last Name",
			cell: info => <div className={styles.cell}>{info.getValue()}</div>,
		}),
		columnHelper.accessor("firstName", {
			header: "First Name",
			cell: info => <div className={styles.cell}>{info.getValue()}</div>,
		}),
		columnHelper.accessor("grade", {
			header: "Grade",
			cell: info => <div className={styles.cell}>{info.getValue()}</div>,
		}),
		columnHelper.accessor("homeroom", {
			header: "Homeroom",
			cell: info => <div className={styles.cell}>{info.getValue()}</div>,
		}),
	];

	const [data, setData] = useState(() => [...studentData]);
	const [sorting, setSorting] = useState<SortingState>([]);
	const refresh = useReducer(() => ({}), {})[1];

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		globalFilterFn: fuzzyTextFilterFn,
	});

	return (
		//
		<main className="flex flex-col gap-3 w-[85%]">
			<Toolbar refresh={refresh} />
			<table className="drop-shadow-sm rounded-md">
				<thead>
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<th key={header.id} className={twMerge(styles.global, styles.header)}>
									{header.isPlaceholder
										? null
										: flexRender(header.column.columnDef.header, header.getContext())}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map(row => (
						<tr
							key={row.id}
							className="hover:bg-light-100 hover:scale-[1.03] hover:ring-1 hover:ring-zinc-300 duration-100"
						>
							{row.getVisibleCells().map(cell => (
								<td key={cell.id} className={twMerge(styles.global, styles.body)}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
				<tfoot>
					{table.getFooterGroups().map(footerGroup => (
						<tr key={footerGroup.id}>
							{footerGroup.headers.map(header => (
								<th key={header.id} className="">
									{header.isPlaceholder
										? null
										: flexRender(header.column.columnDef.footer, header.getContext())}
								</th>
							))}
						</tr>
					))}
				</tfoot>
			</table>
		</main>
	);
}

export type StudentTableProps = {
	studentData: Partial<Student>[];
};
