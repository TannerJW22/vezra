import { HeaderPanel, LeftNavPanel } from "@/components/layouts";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<HeaderPanel />
			<div className="flex">
				<LeftNavPanel />
				<div className="bg-light-100 w-full h-screen">{children}</div>
			</div>
		</>
	);
}
