// organize-imports-ignore
import { Rubik } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider from "./ThemeProvider";
import QueryProvider from "./QueryProvider";

// -=-=-= Types -=-=-= //
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
      <QueryProvider>
        <ThemeProvider>
          <html lang="en">
            <body className={rubik.className}>
              {/* <ReduxProvider> */}
              {children}
              {/* </ReduxProvider> */}
            </body>
          </html>
        </ThemeProvider>
      </QueryProvider>
    </ClerkProvider>
  );
}
