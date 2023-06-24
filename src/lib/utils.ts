import { ClassValue, clsx } from "clsx";
import { type FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { type pseudoServerReturn } from "types";

// :::| Temporary Dev Tool
export async function pseudoServer<TData>(
	res: TData,
	ms: number,
): Promise<pseudoServerReturn<TData>> {
	return new Promise(resolve => {
		setTimeout(() => {
			const pseudoResponse = {
				status: 200,
				statusText: "success",
				data: res,
			};
			return resolve(pseudoResponse);
		}, ms);
	});
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function vezraInputStyle(
	isFormDisabled: boolean,
	fieldError: FieldError | undefined,
	styleProps: { cnDisabled?: string; cnError?: string; className?: string } = {},
) {
	const { cnDisabled, cnError, className } = styleProps;

	const defaultClassName = cn(
		"px-2 outline-none border border-zinc-300 w-[250px] h-12 hover:bg-light-100 focus:bg-light-100 active:bg-light-100 focus:border-b-2 focus:border-x-0 focus:border-t-0 focus:border-primary-500",
		className,
	);
	const disabledClassName = cn(
		"bg-zinc-200 hover:bg-zinc-200 focus:bg-zinc-200 active:bg-zinc-200",
		cnDisabled,
	);
	const errorClassName = cn(
		"border-l-8 border-t-0 border-b-2 border-r-0 border-red-600 focus:border-l-8 focus:border-t-0 focus:border-b-2 focus:border-r-0 focus:rounded-b-none focus:border-red-600",
		cnError,
	);

	return cn(defaultClassName, fieldError && errorClassName, isFormDisabled && disabledClassName);
}
