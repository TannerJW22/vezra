import { UserProfile } from "@clerk/nextjs";

import CheckForRedirect from "@/components/CheckForRedirect";

// -=-=-= Types -=-=-= //
type ProfilePageProps = {
	//
};

// =-=-=- Main Component =-=-=- //
export default function ProfilePage({}: ProfilePageProps) {
	return (
		<CheckForRedirect noAuth="/" className="flex justify-center p-4">
			<UserProfile />
		</CheckForRedirect>
	);
}
