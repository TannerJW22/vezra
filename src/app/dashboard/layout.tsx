"use client";

import { HeaderPanel, LeftNavPanel } from "@/components/layouts";

// -=-=-= Types -=-=-= //
type DashboardLayoutProps = {
  children: React.ReactNode;
};

// =-=-=- Main Component =-=-=- //
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <HeaderPanel />
      <div className="flex">
        <LeftNavPanel />
        <div className="bg-light-100 w-full h-[85vh]">{children}</div>
      </div>
    </>
  );
}
