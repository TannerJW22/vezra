"use client";

// -=-=-= Types & Validators -=-=-= //
type ErrorPageProps = {
	error: Error;
	reset: () => void;
};

// =-=-=- Main Component =-=-=- //
export default function ErrorPage({ error, reset }: ErrorPageProps) {
	return (
		//
		<div className="flex gap-4">
			ErrorPage
			<button className="border border-light-300 py-2 px-3 m-4">Try Again</button>
			<button className="border border-light-300 py-2 px-3 m-4">Home</button>
		</div>
	);
}
