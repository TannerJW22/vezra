"use client";

import { useEffect, useState } from "react";

type MagicDivProps = {
	children: React.ReactNode;
	[key: string]: unknown;
};

type ParentProps = {
	children: React.ReactNode;
	[key: string]: unknown;
};

export function MockProject({ children }: ParentProps) {
	const [state, setState] = useState({
		className: "text-xl",
	}); // <<--| Turn into useMagicElement Hook?

	return <MagicDiv {...state}>{children}</MagicDiv>;
}

export function MagicDiv({ children, ...props }: MagicDivProps) {
	return <div {...props}>{children}</div>;
}
