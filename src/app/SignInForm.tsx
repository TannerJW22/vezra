"use client";

import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ThemeContext } from "@/app/ThemeProvider";
import LoadingSpinner from "@/components/(loading)/LoadingSpinner";
import InlineErrorController from "@/components/InlineErrorController";

import Input from "@/components/(inputs)/Input";
import { Theme } from "@/lib/types";
import { ZodSignInFormData } from "@/lib/validators";
import vezraLogo from "public/img/vezra-logo.png";
import { BsFillDiamondFill } from "react-icons/bs";

// -=-=-= Types -=-=-= //
export type SignInFormData = z.infer<typeof ZodSignInFormData>;

type SignInFormProps = {
  //
};

// =-=-=- Main Component =-=-=- //
export default function SignInForm({}: SignInFormProps) {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const theme: Theme = useContext(ThemeContext);

  const { register, watch, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: zodResolver(ZodSignInFormData),
  });

  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [clerkErrors, setClerkErrors] = useState<string[]>([]);

  async function signInUser({ username, password }: SignInFormData) {
    setIsFormDisabled(true);
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
      <Image
        className="mb-6"
        src={vezraLogo}
        alt="vezra logo"
        width={250}
        height={75}
      />
      <form onSubmit={handleSubmit(signInUser)} noValidate>
        <div className="mb-6">
          <Input
            autoComplete="off"
            disabled={isFormDisabled}
            config={{
              syncDisable: isFormDisabled,
              syncError: formState.errors.username?.message,
              syncValue: watch("username"),
              syncFnProps: () =>
                register("username", {
                  required: "Username is required",
                }),
            }}
            id="username"
            type="text"
          />
          {formState.errors.username && (
            <InlineErrorController
              type="zod"
              errors={formState.errors.username.message}
            />
          )}
        </div>
        <div className="mb-5">
          <Input
            config={{
              syncDisable: isFormDisabled,
              syncError: formState.errors.password?.message,
              syncValue: watch("password"),
              syncFnProps: () =>
                register("password", {
                  required: "Password is required",
                }),
            }}
            disabled={isFormDisabled}
            id="password"
            type="password"
          />
          {formState.errors.password && (
            <InlineErrorController
              type="zod"
              errors={formState.errors.password.message}
            />
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
        {!isFormDisabled && (
          <InlineErrorController type="server" errors={clerkErrors} />
        )}
      </form>
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
