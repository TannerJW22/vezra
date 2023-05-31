"use client";

import { useClerk, RedirectToUserProfile } from "@clerk/clerk-react";

import { VezraUser } from "types";
import { FiLogOut } from "react-icons/fi";
import { RiUserSettingsLine } from "react-icons/ri";

export default function AuthDropdownMenu({ user }: AuthDropdownMenuProps) {
	const { signOut } = useClerk();

	return (
		<div
			className={`flex flex-col gap-1.5 bg-white pb-4 text-zinc-800 shadow-md absolute z-0 border top-16 -left-44 right-4 h-fit rounded-lg`}
		>
			<div className="bg-light-100 border-b-2 border-zinc-100 pr-6 pt-3 pb-2 flex flex-col leading-6 items-end">
				<span className="text-[1.1rem] font-medium tracking-wide">{user.fullName}</span>
				<span className="text-[0.9rem] italic font-sans">{user.role}</span>
			</div>
			<div className="flex flex-col gap-1.5 items-center">
				{/* <button className="w-[85%] border-2 border-zinc-100 flex py-2 px-8 items-center gap-3 hover:bg-light-100 hover:border-zinc-200 hover:text-primary-700">
					<RiUserSettingsLine className="text-[1.15rem]" />
					<span className="text-[0.9rem]">Manage Profile</span>
				</button> */}
				<button
					onClick={() => signOut()}
					className="w-[85%] border-2 border-zinc-100 flex py-2 px-8 items-center gap-3 hover:bg-light-100 hover:border-zinc-200 hover:text-primary-700"
				>
					<FiLogOut className="text-[1.15rem]" />
					<span className="text-[0.9rem]">Sign Out</span>
				</button>
			</div>
		</div>
	);
}

export type AuthDropdownMenuProps = {
	user: VezraUser;
};
