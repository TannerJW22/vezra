import { useUser } from "@clerk/nextjs";
import { type VezraUser, useVezraUserReturn } from "types";

export default function useVezraUser(): useVezraUserReturn {
	let { isLoaded: userIsLoaded, isSignedIn: userIsSignedIn, user } = useUser();

	return {
		userIsLoaded,
		userIsSignedIn,
		user: {
			id: user?.id,
			username: user?.username,
			firstName: user?.firstName,
			lastName: user?.lastName,
			fullName: user?.fullName,
			profileImageUrl: user?.profileImageUrl,
			role: user?.publicMetadata.role as VezraUser["role"],
		},
	};
}
