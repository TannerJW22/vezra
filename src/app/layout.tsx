// organize-imports-ignore
import { Rubik } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider from "./ThemeProvider";
import QueryProvider from "./QueryProvider";
import { Toaster } from "react-hot-toast";

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
              <Toaster
                position="top-center"
                toastOptions={{
                  error: {
                    className: "border-[1.5px] shadow-md border-red-400",
                    style: {
                      background: "rgb(254 202 202)",
                      paddingLeft: "2rem",
                      paddingRight: "2rem",
                      whiteSpace: "nowrap",
                      minWidth: "max-content",
                    },
                  },
                  success: {
                    className: "border-[1.5px] shadow-md border-green-400",
                    style: {
                      background: "rgb(187 247 208)",
                      paddingLeft: "2rem",
                      paddingRight: "2rem",
                      whiteSpace: "nowrap",
                      minWidth: "max-content",
                    },
                  },
                }}
              />
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
