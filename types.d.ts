// :::| Temporary Dev Tool
export interface pseudoServerReturn<TData> {
	status: number;
	statusText: string;
	data: TData;
}

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
