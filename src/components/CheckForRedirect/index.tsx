"use client";

import { useLayoutEffect } from "react";
import { useVezraUser } from "@/hooks";
import { useRouter } from "next/navigation";

import LoadingSpinner from "../(loading)/LoadingScreen";

// -=-=-= Types & Validators -=-=-= //
type CheckForRedirectProps = {
	withAuth?: string;
	noAuth?: string;
	children?: React.ReactNode;
	className?: string;
};

// =-=-=- Main Component =-=-=- //
export default function CheckForRedirect({
	withAuth,
	noAuth,
	children,
	className,
}: CheckForRedirectProps) {
	const router = useRouter();
	const { userIsSignedIn, userIsLoaded } = useVezraUser();

	useLayoutEffect(() => {
		if (userIsLoaded) {
			if (withAuth && userIsSignedIn) {
				router.push(withAuth);
			} else if (noAuth && !userIsSignedIn) {
				router.push(noAuth);
			}
		}
	}, [userIsLoaded, userIsSignedIn]);

	if (!userIsLoaded) return <LoadingSpinner />;

	return (
		//
		<div className={className}>{children}</div>
	);
}
