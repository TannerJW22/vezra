"use client";

import { useState } from "react";

type MagicDivProps = {
	children: React.ReactNode;
	// className: any;
};

// export function Parent() {
// 	return <div className="bg-black">Hello from MagicDiv</div>;
// }

export function MagicDiv({ children }: MagicDivProps) {
	return <div className="bg-green-400">{children}</div>;
}
