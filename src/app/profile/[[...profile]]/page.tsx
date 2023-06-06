import CheckForRedirect from "@/components/CheckForRedirect";
import { UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
	return (
		<CheckForRedirect noAuth="/" className="flex justify-center p-4">
			<UserProfile />
		</CheckForRedirect>
	);
}
