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
	ColumnDef,
} from "@tanstack/react-table";
import { RankingInfo, rankItem, compareItems } from "@tanstack/match-sorter-utils";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/(shadcn-ui)/table";
import DebouncedInput from "@/components/DebouncedInput";
import { TbRefresh } from "react-icons/tb";
import { type Student, ZodStudent } from "@/models/Student";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	_data: TData[];
}

// :::
export function StudentTable<TData, TValue>({ columns, _data }: DataTableProps<TData, TValue>) {
	const [data, setData] = useState(() => [..._data]);
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

	// <<--| Implement Sorting Functionality
	// const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
	// 	let dir = 0;

	// 	// Only sort by rank if the column has ranking information
	// 	if (rowA.columnFiltersMeta[columnId]) {
	// 		dir = compareItems(
	// 			rowA.columnFiltersMeta[columnId]?.itemRank!,
	// 			rowB.columnFiltersMeta[columnId]?.itemRank!,
	// 		);
	// 	}

	// 	// Provide an alphanumeric fallback for when the item ranks are equal
	// 	return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
	// };

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

	const handlePagination = (action: "prev" | "next") => {
		switch (action) {
			case "prev":
				table.previousPage();
				break;
			case "next":
				table.nextPage();
				break;
			default:
				return;
		}
	};

	return (
		<main className="flex flex-col gap-3 w-[85%]">
			<div className="pr-36 flex items-center justify-between">
				<div className="flex gap-3">
					<DebouncedInput
						className="px-2 outline-none border border-zinc-300 rounded-md w-[250px] h-10 hover:bg-light-100 focus:bg-light-100"
						value={globalFilter ?? ""}
						onChange={value => setGlobalFilter(String(value))}
						type="search"
						placeholder=" Search..."
					/>
					<button
						onClick={() => {
							setGlobalFilter("");
							table.setPageIndex(0);
							refresh();
						}}
						className="rounded-xl h-9 w-10 bg-light-100 flex items-center justify-center text-lg text-primary-500 drop-shadow-sm border border-zinc-300 hover:bg-light-200"
					>
						<TbRefresh className="text-[22px]" />
					</button>
				</div>

				<div className="flex gap-1 items-center">
					<p className="text-sm text-primary-700 font-medium">
						Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
					</p>
				</div>

				<div className="flex gap-1 items-center">
					<button
						onClick={() => handlePagination("prev")}
						disabled={!table.getCanPreviousPage()}
						className={cn(
							"text-[22px]",
							"text-primary-500",
							!table.getCanPreviousPage() && "text-zinc-400",
						)}
					>
						<BiLeftArrow />
					</button>
					<button
						onClick={() => handlePagination("next")}
						disabled={!table.getCanNextPage()}
						className={cn(
							"text-[22px]",
							"text-primary-500",
							!table.getCanNextPage() && "text-zinc-400",
						)}
					>
						<BiRightArrow />
					</button>
				</div>
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow className="bg-light-100" key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<TableHead className="hover:bg-light-200" key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody className="">
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow
									className="z-30 cursor-pointer hover:bg-primary-50 duration-100"
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map(cell => (
										<TableCell className="p-2" key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</main>
	);
}
