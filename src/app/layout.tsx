import Link from "next/link";
import "./app.css";
import { Rubik } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { HeaderPanel, LeftNavPanel } from "@/components/layouts";

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
