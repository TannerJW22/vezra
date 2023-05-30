import { SignIn } from "@clerk/nextjs";

export default function Page() {
	return (
		<div>
			MY CUSTOM SIGN IN ROUTE
			<SignIn />
		</div>
	);
}
