"use client";

import { DebouncedSearchBar } from "@/components/(inputs)";
import { SheetTrigger } from "@/components/_(shadcn-ui)/_sheet";
import { useVezraDispatch, useVezraSelector } from "@/hooks";
import { StudentTableData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { setGlobalFilter, setSorting } from "@/store";
import { Table } from "@tanstack/react-table";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { TbRefresh, TbUserPlus } from "react-icons/tb";

export default function StudentTableToolbar({ table }: StudentTableToolbarProps) {
	const dispatch = useVezraDispatch();
	// @ts-ignore
	const { globalFilter }: { globalFilter: string; table: Table<StudentTableData> } =
		useVezraSelector(state => state.studentPage);

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
		<div className="pr-36 flex items-center justify-between">
			<div className="flex gap-3 items-center">
				<DebouncedSearchBar
					className="px-2 mr-1 outline-none border border-zinc-300 rounded-md w-[250px] h-10 hover:bg-light-100 focus:bg-light-100"
					value={globalFilter ?? ""}
					onChange={(value: unknown) => dispatch(setGlobalFilter(String(value)))}
					type="search"
					placeholder=" Search..."
				/>
				<button
					onClick={() => {
						dispatch(setGlobalFilter(""));
						dispatch(setSorting([]));
						table.setPageIndex(0);
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
	);
}

export type StudentTableToolbarProps = {
	table: Table<StudentTableData>;
};
