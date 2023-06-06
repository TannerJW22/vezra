"use client";

// |1| Confirm error flow with auth fails
// |1| Research & Add Zod or Yup Validation Layer in Formik with visuals

import CheckForRedirect from "@/components/CheckForRedirect";
import Image from "next/image";
import kha from "public/img/kha-login-page.png";

import SignInForm from "@/components/_forms/SignInForm";
import { useSignIn } from "@clerk/nextjs";
import LoadingSpinner from "@/components/_loading/LoadingScreen";

export default function SignInPage() {
	const { isLoaded, signIn, setActive } = useSignIn();

	if (!isLoaded) return <LoadingSpinner />;

	async function signInUser(username: string, password: string): Promise<signInUserReturn> {
		// err.errors[0].longMessage;
		try {
			const res = await signIn!.create({
				identifier: username,
				password: password,
			});

			setActive!({ session: res.createdSessionId });
			return res;
			//
		} catch (err) {
			return err;
		}
	}

	return (
		<CheckForRedirect withAuth="/dashboard" className="relative flex justify-center">
			<main>
				<div className="flex justify-center w-full h-screen min-h-[400px] min-w-[525px]">
					<div className="h-full w-full min-w-[600px] bg-primary-500"></div>
					<div className=" shrink h-full w-full bg-yellow-200">
						<Image
							className="object-cover w-full h-full"
							src={kha}
							alt="vezra logo"
							width={1150}
							height={500}
						/>
					</div>
				</div>
				<SignInForm signInUser={signInUser} />
			</main>
		</CheckForRedirect>
	);
}

type signInUserReturn = any;
