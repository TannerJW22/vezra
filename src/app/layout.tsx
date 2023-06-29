import "./globals.css";
import { Rubik } from "@next/font/google";

import { ClerkProvider } from "@clerk/nextjs";
import ReduxProvider from "@/store";
import { Suspense } from "react";
import Loading from "./loading";

// -=-=-= Types & Validators -=-=-= //
type RootLayoutProps = {
	children: React.ReactNode;
};

// -=-=-= External Constants -=-=-= //
const rubik = Rubik({
	subsets: ["latin"],
	weight: ["300", "400", "500", "700", "900"],
	style: ["italic", "normal"],
});

export const metadata = {
	title: "Vezra",
	description: "",
};

// =-=-=- Main Component =-=-=- //
export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={rubik.className}>
					{/* <ReduxProvider> */}
					{children}
					{/* </ReduxProvider> */}
				</body>
			</html>
		</ClerkProvider>
	);
}
