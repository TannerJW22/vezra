"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import vezraLogo from "public/img/vezra-logo.png";
import { BsFillDiamondFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/(loading)/LoadingSpinner";
import InlineErrorController from "@/components/InlineErrorController";
import { vezraInputStyle } from "@/lib/utils";

const ZodSignInFormSchema = z.object({
	username: z.string().nonempty(),
	password: z.string().nonempty(),
});

type SignInFormData = z.infer<typeof ZodSignInFormSchema>;

// :::
export default function SignInForm({}: any) {
	const router = useRouter();
	const { isLoaded, signIn, setActive } = useSignIn();

	const { register, control, handleSubmit, formState } = useForm<SignInFormData>({
		resolver: zodResolver(ZodSignInFormSchema),
	});

	const [isFormDisabled, setIsFormDisabled] = useState(false);
	const [clerkErrors, setClerkErrors] = useState<string[]>([]);

	async function signInUser({ username, password }: SignInFormData) {
		setIsFormDisabled(true);
		// <<--| Perform input vaildation step and display any validation errors.

		// Reset Errors and perform remote authentication request
		setClerkErrors([]);
		try {
			const res = await signIn!.create({
				identifier: username,
				password: password,
			});

			setActive!({ session: res.createdSessionId });
			router.push("/dashboard");
			//
		} catch (err: any) {
			setClerkErrors([err.errors[0].longMessage]);
			setIsFormDisabled(false);
		}
	}

	return (
		<div className="absolute top-16 left-12 sm:left-32 md:left-1/3 max-w-[375px] bg-white shadow-lg shadow-zinc-700 overflow-hidden rounded-lg py-8 px-10 text-center justify-center items-center sm:px-12 md:px-[60px]">
			<Image className="mb-4" src={vezraLogo} alt="vezra logo" width={250} height={75} />
			<form onSubmit={handleSubmit(signInUser)} noValidate>
				<div className="mb-5">
					<input
						autoComplete="off"
						disabled={isFormDisabled}
						className={vezraInputStyle(isFormDisabled, formState.errors.username)}
						id="username"
						type="text"
						placeholder=" Username"
						{...register("username", {
							required: "Username is required",
						})}
					/>
					{formState.errors.username && (
						<InlineErrorController type="zod" errors={formState.errors.username.message} />
					)}
				</div>
				<div className="mb-5">
					<input
						disabled={isFormDisabled}
						className={vezraInputStyle(isFormDisabled, formState.errors.password)}
						id="password"
						type="password"
						placeholder=" Password"
						{...register("password", {
							required: "Password is required",
						})}
					/>
					{formState.errors.password && (
						<InlineErrorController type="zod" errors={formState.errors.password.message} />
					)}
				</div>
				<div className="mb-5">
					<button
						className="flex items-center text-center justify-center w-[250px] bg-primary-300 tracking-wider cursor-pointer rounded-md py-2.5 px-5 text-xl text-light-100 font-normal transition shadow-md shadow-zinc-200 hover:shadow-zinc-300 hover:bg-primary-500 active:translate-y-[1px] active:shadow-none"
						disabled={isFormDisabled}
					>
						{isFormDisabled ? <LoadingSpinner color="#FAFAFA" /> : "Login"}
					</button>
				</div>
				{!isFormDisabled && <InlineErrorController type="server" errors={clerkErrors} />}
			</form>
			{/* <DevTool control={control} /> */}
			<p className="text-base font-medium text-zinc-800">
				Not an Authorized User?
				<br />
				<span className="mt-1 flex justify-center items-center w-full gap-3">
					<Link
						href="#"
						className="text-blue-700 visited:text-blue-700 font-normal hover:underline hover:text-blue-600"
					>
						Request Access
					</Link>
					<BsFillDiamondFill className="text-[7.5px]" />
					<Link
						href="#"
						className="text-blue-700 visited:text-blue-700 font-normal hover:underline hover:text-blue-600 "
					>
						View Demo
					</Link>
				</span>
			</p>
		</div>
	);
}
