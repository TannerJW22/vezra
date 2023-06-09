"use client";

import { useVezraUser } from "@/hooks";
import { IoNotificationsSharp, IoSettingsSharp } from "react-icons/io5";
import vezraLogo from "public/img/vezra-logo.png";
import AuthWidget from "@/components/AuthWidget";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function HeaderPanel() {
	const { userIsLoaded, userIsSignedIn, user } = useVezraUser();

	// if (!userIsLoaded) return <LoadingSpinner />;

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
					<input
						className="px-2 outline-none border border-zinc-300 rounded-md w-[250px] h-10 hover:bg-light-100 focus:bg-light-100 active:bg-light-100"
						type="search"
						placeholder=" Search..."
					/>
					<button className="bg-light-100 flex items-center justify-center text-lg text-primary-500 drop-shadow-sm border border-zinc-300 rounded-full h-10 w-10">
						<IoNotificationsSharp />
					</button>
					<button className="bg-light-100 flex items-center justify-center text-lg text-primary-500 drop-shadow-sm border border-zinc-300 rounded-full h-10 w-10">
						<IoSettingsSharp />
					</button>
					<AuthWidget user={user} />
				</div>
			</div>
		</div>
	);
}
