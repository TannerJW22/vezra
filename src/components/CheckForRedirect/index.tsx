"use client";
import React from "react";
import { useVezraUser } from "@/hooks";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../_loading/LoadingScreen";

export default function CheckForRedirect({
	withAuth,
	noAuth,
	children,
	className,
}: CheckForRedirectProps) {
	const router = useRouter();
	const { userIsSignedIn, userIsLoaded } = useVezraUser();

	if (!userIsLoaded) return <LoadingSpinner />;

	if (withAuth && userIsLoaded && userIsSignedIn) {
		router.push(withAuth);
	}

	if (noAuth && userIsLoaded && !userIsSignedIn) {
		router.push(noAuth);
	}

	return (
		//
		<div className={className}>{children}</div>
	);
}

export type CheckForRedirectProps = {
	withAuth?: string;
	noAuth?: string;
	children?: React.ReactNode;
	className?: string;
};
