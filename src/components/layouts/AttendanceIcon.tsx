import attendanceIcon from "@/assets/attendance-icon.png";
import React from "react";
import Image from "next/image";

export default function AttendanceIcon({ className }: AttendanceIconProps) {
	return (
		<div className={className}>
			<Image src={attendanceIcon} alt="attendance icon" width={40} height={40} />
		</div>
	);
}

export type AttendanceIconProps = {
	className?: string;
};
