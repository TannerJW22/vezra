"use client";

import { _publicPaths_ } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// -=-=-= Types & Validators -=-=-= //
type ProtectRouteProps = {
  children?: React.ReactNode;
  className?: string;
  appRouterInstance?: AppRouterInstance;
  customRedirectPath?: string;
  useAuthReturn?: any;
};

// =-=-=- Main Component =-=-=- //
export default function ProtectRoute({
  children,
  className,
  appRouterInstance,
  useAuthReturn,
  customRedirectPath,
}: ProtectRouteProps) {
  const auth = useAuthReturn ?? useAuth();
  const router = appRouterInstance ?? useRouter();

  useEffect(() => {
    if (auth.isLoaded && !auth.isSignedIn) {
      router.push(customRedirectPath ?? `${_publicPaths_[0]}`);
    }
  }, [auth.isLoaded, auth.isSignedIn, router]);

  return <div className={className}>{children}</div>;
}
