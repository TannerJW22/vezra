import vezraLogo from "public/img/vezra-icon.png";
import Image from "next/image";

// -=-=-= Types & Validators -=-=-= //
type LoadingScreenProps = {
	className?: string;
	width?: string;
	height?: string;
};

// =-=-=- Main Component =-=-=- //
export default function LoadingScreen({ className, width, height }: LoadingScreenProps) {
	return (
		<div
			className={
				className ||
				"flex absolute z-50 top-0 left-0 right-0 bottom-0 bg-light-300 w-full h-screen justify-center items-center"
			}
		>
			<div className="absolute shrink h-16 w-16">
				<Image
					className="object-cover w-full h-full bg-light-300"
					src={vezraLogo}
					alt="vezra logo"
					width={75}
					height={75}
				/>
			</div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				style={{
					margin: "auto",
					background: "transparent",
					display: "block",
					shapeRendering: "auto",
				}}
				width={width ?? `160px`}
				height={height ?? `160px`}
				viewBox="0 0 100 100"
				preserveAspectRatio="xMidYMid"
			>
				<circle
					cx="50"
					cy="50"
					r="40"
					strokeWidth="5"
					stroke="#542650"
					strokeDasharray="50.26548245743669 50.26548245743669"
					fill="none"
					strokeLinecap="round"
				>
					<animateTransform
						attributeName="transform"
						type="rotate"
						repeatCount="indefinite"
						dur="1000ms"
						keyTimes="0;1"
						values="0 50 50;360 50 50"
					></animateTransform>
				</circle>
			</svg>
		</div>
	);
}
