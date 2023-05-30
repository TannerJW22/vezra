import Link from "next/link";
import "./app.css";
import { Rubik } from "next/font/google";
import { IoSettingsSharp, IoNotificationsSharp } from "react-icons/io5";
import { ClerkProvider, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

import AuthWidget from "@/components/AuthWidget";

const rubik = Rubik({
	subsets: ["latin"],
	weight: ["300", "400", "500", "700", "900"],
	style: ["italic", "normal"],
});

export const metadata = {
	title: "Vezra",
	description: "",
};

// :::
export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={rubik.className}>
					<HeaderPanel />
					<div className="flex">
						<LeftNavPanel />
						<div className="bg-light-100 w-full h-screen">{children}</div>
					</div>
				</body>
			</html>
		</ClerkProvider>
	);
}

// :::
const HeaderPanel: React.FC = () => {
	return (
		//
		<div className="w-full h-24 border-b border-light-300">
			<div className="h-full flex items-center justify-end py-1 pr-8">
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
					<AuthWidget />
				</div>
			</div>
		</div>
	);
};

// :::
const LeftNavPanel: React.FC = () => {
	return (
		//
		<div className="bg-primary-700 w-52 h-screen rounded-sm">x</div>
	);
};
