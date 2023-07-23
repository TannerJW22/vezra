import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default function middleware(req: Request, res: Response) {
  authMiddleware();

  NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
