"use client";

import { AttendanceIcon } from "@/components/layouts";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { IoSchoolOutline, IoPeopleOutline } from "react-icons/io5";

export type NavButtonId = "attendance" | "classes" | "students" | "";

export default function LeftNavPanel() {
	const [activeNavButton, setActiveButton] = useState<NavButtonId>("");
	const router = useRouter();

	useEffect(() => {
		const currentPathId = window.location.pathname.replace("/dashboard/", "");
		setActiveButton(currentPathId as NavButtonId);
	}, []);

	const renderStyle = (buttonId: Exclude<NavButtonId, "">) => {
		const leftNavButtonStyle = Object.freeze({
			active:
				"h-[58px] flex items-center gap-3 pl-9 py-2.5 rounded-md border-l-[12px] border-white shadow-md shadow-primary-700 border-primary-300 bg-primary-100 duration-200",
			inactive:
				"h-[58px] flex items-center gap-3 pl-4 mx-3 py-2.5 rounded-md border-2 border-dotted shadow-md hover:shadow-primary-700 border-primary-300 hover:border-none hover:bg-primary-100 hover:bg-opacity-[50%] transition-transform duration-200",
		});

		if (buttonId === activeNavButton) return leftNavButtonStyle.active;
		if (buttonId !== activeNavButton) return leftNavButtonStyle.inactive;
	};

	const handleClick = (e: any) => {
		if (e.target.id === activeNavButton) {
			setActiveButton("");
			router.push(`/dashboard`);
		} else {
			setActiveButton(e.target.id);
			router.push(`/dashboard/${(e.target as HTMLButtonElement).id}`);
		}
	};

	return (
		//
		<div className="bg-primary-500 w-64 h-[85vh] rounded-sm shadow-md text-light-300 font-base text-base">
			<div className="mt-8 flex flex-col gap-3.5">
				<button id="attendance" className={renderStyle("attendance")} onClick={e => handleClick(e)}>
					<AttendanceIcon className="pointer-events-none" />
					<span className="pointer-events-none">Attendance</span>
				</button>
				<button id="classes" className={renderStyle("classes")} onClick={e => handleClick(e)}>
					<IoSchoolOutline className="w-[40px] h-[43px] pointer-events-none" />
					<span className="pointer-events-none">Classes</span>
				</button>
				<button id="students" className={renderStyle("students")} onClick={e => handleClick(e)}>
					<IoPeopleOutline className="w-[40px] h-[43px] pointer-events-none" />
					<span className="pointer-events-none">Students</span>
				</button>
			</div>
		</div>
	);
}
