import DebouncedInput from "@/components/DebouncedInput";
import { useState } from "react";
import { TbRefresh } from "react-icons/tb";

export default function Toolbar({ refresh }: ToolbarProps) {
	return (
		<div className="flex gap-2">
			<DebouncedInput
				className="px-2 outline-none border border-zinc-300 rounded-md w-[250px] h-10 hover:bg-light-100 focus:bg-light-100"
				type="search"
				placeholder=" Search..."
			/>
			<div>
				<button
					onClick={() => refresh()}
					className="rounded-xl h-10 w-12 bg-light-100 flex items-center justify-center text-lg text-primary-500 drop-shadow-sm border border-zinc-300 hover:bg-light-200"
				>
					<TbRefresh className="text-2xl" />
				</button>
			</div>
		</div>
	);
}

export type ToolbarProps = {
	refresh: () => void;
};
