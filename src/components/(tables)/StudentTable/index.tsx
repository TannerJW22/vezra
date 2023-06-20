"use client";

import { useReducer, useState } from "react";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	sortingFns,
	type FilterFn,
	type SortingFn,
	type SortingState,
	getFilteredRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFacetedMinMaxValues,
} from "@tanstack/react-table";
import { RankingInfo, rankItem, compareItems } from "@tanstack/match-sorter-utils";

import { type Student, ZodStudent } from "@/models/Student";
import { twMerge } from "tailwind-merge";
import { tailbreeze } from "tailbreeze";
import Toolbar from "./Toolbar";
import DebouncedInput from "@/components/DebouncedInput";
import { TbRefresh } from "react-icons/tb";
import { IoTrashBin } from "react-icons/io5";

const styles = {
	global: "border-y",
	header: "px-12 py-2 bg-zinc-200",
	body: "",
	footer: "",
	cell: tailbreeze({
		base: "w-full border-x border-light-200 py-2 rounded-md text-center text-[14px] tracking-tight",
		hover: "cursor-pointer",
	}),
};

// :::
export default function StudentTable({ studentData }: StudentTableProps) {
	const [data, setData] = useState(() => [...studentData]);
	const [globalFilter, setGlobalFilter] = useState("");
	const [sorting, setSorting] = useState<SortingState>([]);
	const refresh = useReducer(() => ({}), {})[1];

	const columnHelper = createColumnHelper<Partial<Student>>();

	const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
		// Rank the item
		const itemRank = rankItem(row.getValue(columnId), value);

		// Store the itemRank info
		addMeta({
			itemRank,
		});

		// Return if the item should be filtered in/out
		return itemRank.passed;
	};

	const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
		let dir = 0;

		// Only sort by rank if the column has ranking information
		if (rowA.columnFiltersMeta[columnId]) {
			dir = compareItems(
				rowA.columnFiltersMeta[columnId]?.itemRank!,
				rowB.columnFiltersMeta[columnId]?.itemRank!,
			);
		}

		// Provide an alphanumeric fallback for when the item ranks are equal
		return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
	};

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

	const table = useReactTable({
		data,
		columns,
		filterFns: {
			fuzzy: fuzzyFilter,
		},
		state: {
			globalFilter,
			sorting,
		},
		onSortingChange: setSorting,
		onGlobalFilterChange: setGlobalFilter,
		globalFilterFn: fuzzyFilter,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFacetedMinMaxValues: getFacetedMinMaxValues(),
		debugTable: true,
		debugHeaders: true,
		debugColumns: false,
	});

	return (
		//
		<main className="flex flex-col gap-3 w-[85%]">
			<div className="flex gap-2 items-center">
				<DebouncedInput
					className="px-2 outline-none border border-zinc-300 rounded-md w-[250px] h-10 hover:bg-light-100 focus:bg-light-100"
					value={globalFilter ?? ""}
					onChange={value => setGlobalFilter(String(value))}
					type="search"
					placeholder=" Search..."
				/>
				<div className="flex gap-2 items-center">
					<button
						onClick={() => {
							setGlobalFilter("");
							refresh();
						}}
						className="rounded-xl h-9 w-10 bg-light-100 flex items-center justify-center text-lg text-primary-500 drop-shadow-sm border border-zinc-300 hover:bg-light-200"
					>
						<IoTrashBin className="text-[20px]" />
					</button>
					<button
						onClick={() => refresh()}
						className="rounded-xl h-9 w-10 bg-light-100 flex items-center justify-center text-lg text-primary-500 drop-shadow-sm border border-zinc-300 hover:bg-light-200"
					>
						<TbRefresh className="text-[22px]" />
					</button>
				</div>
			</div>
			<table className="drop-shadow-sm rounded-md">
				<thead>
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<th key={header.id} className={twMerge(styles.global, styles.header)}>
									{header.isPlaceholder ? null : (
										<div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
									)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map(row => (
						<tr
							key={row.id}
							className="hover:bg-primary-50 hover:scale-[1.03] hover:ring-1 hover:ring-primary-75 duration-100"
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

declare module "@tanstack/table-core" {
	interface FilterFns {
		fuzzy: FilterFn<unknown>;
	}
	interface FilterMeta {
		itemRank: RankingInfo;
	}
}

export type StudentTableProps = {
	studentData: Partial<Student>[];
};
