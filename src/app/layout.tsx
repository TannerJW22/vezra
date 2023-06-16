import "./app.css";
import { Rubik } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store/index";

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
			<ReduxProvider store={store}>
				<html lang="en">
					<body className={rubik.className}>{children}</body>
				</html>
			</ReduxProvider>
		</ClerkProvider>
	);
}
