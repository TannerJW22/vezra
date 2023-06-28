import Image from "next/image";

import attendanceIcon from "@/assets/attendance-icon.png";

// -=-=-= Types & Validators -=-=-= //
export type AttendanceIconProps = {
	className?: string;
};

// =-=-=- Main Component =-=-=- //
export default function AttendanceIcon({ className }: AttendanceIconProps) {
	return (
		<div className={className}>
			<Image src={attendanceIcon} alt="attendance icon" width={40} height={40} />
		</div>
	);
}
