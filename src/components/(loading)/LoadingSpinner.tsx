import React from "react";

export default function LoadingSpinner({ className, width, height, color }: LoadingSpinnerProps) {
	return (
		<div className={className || "flex h-fit w-fit justify-center items-center"}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				style={{
					margin: "-10px",
					background: "transparent",
					display: "block",
					shapeRendering: "auto",
				}}
				width={width ?? `50px`}
				height={height ?? `50px`}
				viewBox="0 0 100 100"
				preserveAspectRatio="xMidYMid"
			>
				<circle
					cx="50"
					cy="50"
					r="22"
					strokeWidth="7"
					stroke={color ?? `#542650`}
					strokeDasharray="50.26548245743669 50.26548245743669"
					fill="none"
					strokeLinecap="round"
				>
					<animateTransform
						attributeName="transform"
						type="rotate"
						repeatCount="indefinite"
						dur="800ms"
						keyTimes="0;1"
						values="0 50 50;360 50 50"
					></animateTransform>
				</circle>
			</svg>
		</div>
	);
}

export type LoadingSpinnerProps = {
	className?: string;
	width?: string;
	height?: string;
	color?: string;
};
