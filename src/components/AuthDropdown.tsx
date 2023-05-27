"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";

const AuthDropdown: React.FC = () => {
	const toggleDropdown = () => {};

	return (
		//
		<div className="flex items-center justify-center">
			<button onClick={() => toggleDropdown}>
				<div className="group relative mr-4 h-[62px] w-[62px] rounded-full drop-shadow-md hover:ring-green-700">
					<img
						src="https://cdn.tailgrids.com/2.0/image/dashboard/images/avatar/image-05.jpg"
						alt="profile avatar"
						className="h-full w-full rounded-full object-cover object-center"
					/>
					<span className="absolute bottom-0 right-0 block h-[17px] w-[17px] rounded-full border-[2.5px] border-white bg-green-700" />
				</div>
			</button>
			{/* <DropdownMenu /> */}
		</div>
	);
};

export default AuthDropdown;

const DropdownMenu = () => {
	return (
		//
		<div>dropdown</div>
	);
};
