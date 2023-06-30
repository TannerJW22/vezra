// organize-imports-ignore
import { Rubik } from "@next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";

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
