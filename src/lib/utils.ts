import type { ClassValue } from "@/lib/types";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// -=-=-= Types -=-=-= //
export interface pseudoServerReturn<TData> {
	status: number;
	statusText: string;
	data: TData;
}

// =-=-=- Utility Functions =-=-=- //
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
