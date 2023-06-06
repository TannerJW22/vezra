"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import Image from "next/image";

import vezraLogo from "public/img/vezra-logo.png";
import { BsFillDiamondFill } from "react-icons/bs";
import Link from "next/link";
import { Formik } from "Formik";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/_loading/LoadingSpinner";

export default function SignInForm({ signInUser }: any) {
	const router = useRouter();
	const [isFormDisabled, setIsFormDisabled] = useState(false);
	//
	async function handleSubmit(values: any, actions: any) {
		setIsFormDisabled(true);
		const res = await signInUser(values.username, values.password);
		console.log(res); // <<--*
		router.push("/dashboard");
	}

	return (
		<div className="absolute top-20 left-12 sm:left-32 md:left-1/3 max-w-[525px] bg-white shadow-lg shadow-zinc-700 overflow-hidden rounded-lg py-8 px-10 text-center justify-center items-center sm:px-12 md:px-[60px]">
			<Image className="mb-6" src={vezraLogo} alt="vezra logo" width={250} height={75} />
			<Formik initialValues={{ username: "", password: "" }} onSubmit={handleSubmit}>
				{props => (
					<form onSubmit={props.handleSubmit}>
						<div className="mb-6">
							<input
								disabled={isFormDisabled}
								className={`px-2 outline-none border border-zinc-300 rounded-md w-[250px] h-12 hover:bg-light-100 focus:bg-light-100 active:bg-light-100 ${
									isFormDisabled &&
									`bg-zinc-200 hover:bg-zinc-200 focus:bg-zinc-200 active:bg-zinc-200`
								}`}
								name="username"
								type="text"
								value={props.values.username}
								onChange={props.handleChange}
								placeholder=" Username"
							/>
						</div>
						<div className="mb-6">
							<input
								disabled={isFormDisabled}
								className={`px-2 outline-none border border-zinc-300 rounded-md w-[250px] h-12 hover:bg-light-100 focus:bg-light-100 active:bg-light-100 ${
									isFormDisabled &&
									`bg-zinc-200 hover:bg-zinc-200 focus:bg-zinc-200 active:bg-zinc-200`
								}`}
								name="password"
								type="password"
								value={props.values.password}
								onChange={props.handleChange}
								placeholder=" Password"
							/>
						</div>
						<div className="mb-8">
							<button
								className="flex items-center text-center justify-center w-full bg-primary-300 tracking-wider cursor-pointer rounded-md py-2.5 px-5 text-xl text-light-100 font-normal transition shadow-md shadow-zinc-200 hover:shadow-zinc-300 hover:bg-primary-500 active:translate-y-[1px] active:shadow-none"
								disabled={isFormDisabled}
							>
								{isFormDisabled ? <LoadingSpinner color="#FAFAFA" /> : "Login"}
							</button>
						</div>
					</form>
				)}
			</Formik>
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
					<BsFillDiamondFill className="text-[7px]" />
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
