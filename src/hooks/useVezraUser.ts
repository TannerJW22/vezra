import { useUser } from "@clerk/nextjs";

// -=-=-= Types & Validators -=-=-= //
export type VezraUser = {
	id: string | undefined;
	username: string | null | undefined;
	firstName: string | null | undefined;
	lastName: string | null | undefined;
	fullName: string | null | undefined;
	profileImageUrl: string | undefined;
	role: "Administrator" | "Staff" | undefined;
};

export type useVezraUserReturn = {
	userIsLoaded: boolean | undefined;
	userIsSignedIn: boolean | undefined;
	user: VezraUser;
};

// =-=-=- Hook Declaration =-=-=- //
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
