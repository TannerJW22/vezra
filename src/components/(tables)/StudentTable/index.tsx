"use client";

import { useReducer, useState } from "react";
import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	type FilterFn,
	type SortingState,
	getFilteredRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFacetedMinMaxValues,
	ColumnDef,
} from "@tanstack/react-table";
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/_(shadcn-ui)/_table";
import { DebouncedSearchBar } from "@/components/(inputs)";
import { TbRefresh } from "react-icons/tb";
import { type Student, ZodStudent } from "@/models/Student";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import { cn } from "@/lib/utils";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import { TbUserPlus } from "react-icons/tb";
import AddStudentForm from "@/components/(forms)/AddStudentForm";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/_(shadcn-ui)/_sheet";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	_data: TData[];
}

declare module "@tanstack/table-core" {
	interface FilterFns {
		fuzzy: FilterFn<unknown>;
	}
	interface FilterMeta {
		itemRank: RankingInfo;
	}
}

// :::
export function StudentTable<TData, TValue>({ columns, _data }: DataTableProps<TData, TValue>) {
	const [data, setData] = useState(() => [..._data]);
	const [globalFilter, setGlobalFilter] = useState("");
	const [sorting, setSorting] = useState<SortingState>([]);
	const refresh = useReducer(() => ({}), {})[1];

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

	const renderSortingIcon = (sortStatus: "asc" | "desc" | "") => {
		switch (sortStatus) {
			case "asc":
				return (
					<BsArrowUpShort className="text-zinc-600 border rounded-full hover:bg-light-200 w-7 h-7" />
				);
				break;
			case "desc":
				return (
					<BsArrowDownShort className="text-zinc-600 border rounded-full hover:bg-light-200 w-7 h-7" />
				);
				break;
			default:
				null;
		}
	};

	return (
		<main className="flex flex-col gap-3 w-[85%]">
			<Sheet>
				<div className="pr-36 flex items-center justify-between">
					<div className="flex gap-3 items-center">
						<DebouncedSearchBar
							className="px-2 mr-1 outline-none border border-zinc-300 rounded-md w-[250px] h-10 hover:bg-light-100 focus:bg-light-100"
							value={globalFilter ?? ""}
							onChange={(value: unknown) => setGlobalFilter(String(value))}
							type="search"
							placeholder=" Search..."
						/>
						<button
							onClick={() => {
								setGlobalFilter("");
								setSorting([]);
								table.setPageIndex(0);
								refresh();
							}}
							className="flex gap-1.5 items-center justify-center rounded-xl h-9 w-36 bg-light-100 text-primary-500 drop-shadow-sm border border-zinc-300 hover:bg-light-200"
						>
							<TbRefresh className="text-[22px]" />
							<span className="text-[15px]">Reset Table</span>
						</button>
						<SheetTrigger>
							<button className="flex gap-1.5 items-center justify-center rounded-xl h-9 w-36 bg-light-100 text-primary-500 drop-shadow-sm border border-zinc-300 hover:bg-light-200">
								<TbUserPlus className="text-[22px]" />
								<span className="text-[15px]">Add Student</span>
							</button>
						</SheetTrigger>
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
											<TableHead
												className={cn(
													"hover:bg-zinc-100 cursor-pointer select-none",
													header.column.getIsSorted() &&
														"bg-zinc-100 border-b-[2.5px] border-zinc-400",
												)}
												onClick={() => header.column.toggleSorting()}
												key={header.id}
											>
												<div className="relative py-2 pl-1 flex gap-4 items-center text-zinc-600">
													{header.isPlaceholder
														? null
														: flexRender(header.column.columnDef.header, header.getContext())}
													<div className="absolute right-[25%]">
														{renderSortingIcon(
															String(header.column.getIsSorted()) as "asc" | "desc" | "",
														)}
													</div>
												</div>
											</TableHead>
										);
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map(row => (
									<TableRow
										className="z-30 cursor-pointer select-none hover:bg-primary-50 hover:outline hover:outline-1 hover:outline-primary-100 hover:scale-[1.035] hover:translate-x-1 transition-all duration-200"
										key={row.id}
										data-state={row.getIsSelected() && "selected"}
									>
										{row.getVisibleCells().map(cell => (
											<TableCell className="p-2 max-w-[100px]" key={cell.id}>
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
					<div>
						<SheetContent side="right">
							<SheetHeader>
								<SheetTitle>Add New Student</SheetTitle>
								<AddStudentForm />
							</SheetHeader>
						</SheetContent>
					</div>
				</div>
			</Sheet>
		</main>
	);
}
