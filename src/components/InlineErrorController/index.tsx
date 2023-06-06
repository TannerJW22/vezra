import { useState } from "react";
import { BsFillDiamondFill } from "react-icons/bs";

export default function InlineErrorController({
	className,
	errors = [],
}: InlineErrorControllerProps) {
	if (errors.length === 0) return null;

	return (
		//
		<div
			className={
				className ||
				"mb-6 bg-red-100 py-2 rounded-md border text-[0.8rem] border-red-800 text-red-800 font-medium"
			}
		>
			{errors.map((error, i) => {
				return (
					<span key={i} className="flex justify-center mx-4 gap-2 whitespace-normal">
						{error}
						<br />
					</span>
				);
			})}
		</div>
	);
}

type InlineErrorControllerProps = {
	errors: string[] | [];
	className?: string;
};
