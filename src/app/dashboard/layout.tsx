import CheckForRedirect from "@/components/CheckForRedirect";
import { HeaderPanel, LeftNavPanel } from "@/components/layouts";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<CheckForRedirect noAuth="/">
			<HeaderPanel />
			<div className="flex">
				<LeftNavPanel />
				<div className="bg-light-100 w-full h-[85vh]">{children}</div>
			</div>
		</CheckForRedirect>
	);
}
