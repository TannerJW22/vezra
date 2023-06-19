import "./app.css";
import { Rubik } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
// import ReduxProvider from "@/store";

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

export type RootLayoutProps = {
	children: React.ReactNode;
};
