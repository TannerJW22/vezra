"use client";

// |1| Confirm error flow with auth fails
// |1| Research & Add Zod or Yup Validation Layer in Formik with visuals

import CheckForRedirect from "@/components/CheckForRedirect";
import Image from "next/image";
import kha from "public/img/kha-login-page.png";

import SignInForm from "@/components/_forms/SignInForm";
import { useState } from "react";
import { LoadingScreen } from "@/components/_loading";

export default function SignInPage() {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<CheckForRedirect withAuth="/dashboard" className="relative flex justify-center">
			{isLoading && <LoadingScreen />}
			<main>
				<div className="flex justify-center w-full h-screen min-h-[400px] min-w-[525px]">
					<div className="h-full w-full min-w-[600px] bg-primary-500" />
					<div className=" shrink h-full w-full">
						<Image
							onLoadingComplete={() => setIsLoading(false)}
							className="object-cover w-full h-full"
							src={kha}
							alt="vezra logo"
							width={1150}
							height={500}
						/>
					</div>
				</div>
				<SignInForm />
			</main>
		</CheckForRedirect>
	);
}
