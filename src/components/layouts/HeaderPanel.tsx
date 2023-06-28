"use client";

import { useEffect } from "react";

import { IoNotificationsSharp, IoSettingsSharp } from "react-icons/io5";
import { redirect } from "next/navigation";
import Image from "next/image";

import AuthWidget from "@/components/AuthWidget";
import { useVezraUser } from "@/hooks";
import vezraLogo from "public/img/vezra-logo.png";

// -=-=-= Types & Validators -=-=-= //
type HeaderPanelProps = {
	//
};

// =-=-=- Main Component =-=-=- //
export default function HeaderPanel({}: HeaderPanelProps) {
	const { userIsLoaded, userIsSignedIn, user } = useVezraUser();

	useEffect(() => {
		if (userIsLoaded && !userIsSignedIn) {
			redirect("/");
		}
	}, [userIsSignedIn]);

	return (
		//
		<div className="relative flex w-full h-24 border-b border-light-300">
			<div className="h-full w-fit ml-1 p-4">
				<Image src={vezraLogo} alt="vezra icon" width={175} height={40} />
			</div>
			<div className="absolute right-0 h-full flex items-center justify-end py-1 pr-8">
				<div className="flex items-center gap-3">
					<button className="rounded-full h-10 w-10 bg-light-100 flex items-center justify-center text-lg text-primary-500 drop-shadow-sm border border-zinc-300 hover:bg-light-200">
						<IoNotificationsSharp />
					</button>
					<button className="rounded-full h-10 w-10 bg-light-100 flex items-center justify-center text-lg text-primary-500 drop-shadow-sm border border-zinc-300 hover:bg-light-200">
						<IoSettingsSharp />
					</button>
					<AuthWidget user={user} />
				</div>
			</div>
		</div>
	);
}
