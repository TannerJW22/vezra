"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

import { AuthDropdownMenu } from "./AuthDropdownMenu";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const AuthWidget: React.FC = () => {
	const [showDropdown, setShowDropdown] = useState(false);

	return (
		<div className="flex items-center justify-center">
			<button onClick={() => setShowDropdown(!showDropdown)}>
				<div className="group relative mr-4 h-[62px] w-[62px] rounded-full drop-shadow-md hover:ring-green-700">
					<img
						src="https://cdn.tailgrids.com/2.0/image/dashboard/images/avatar/image-05.jpg"
						alt="profile avatar"
						className="h-full w-full rounded-full object-cover object-center"
					/>
					<span className="absolute bottom-0 right-0 block h-[17px] w-[17px] rounded-full border-[2.5px] border-white bg-green-700" />
				</div>
			</button>
			<AuthDropdownMenu />
			<UserButton />
		</div>
	);
};

export default AuthWidget;
