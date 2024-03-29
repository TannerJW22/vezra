"use client";

import { useAuth, useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ThemeContext } from "@/app/ThemeProvider";
import LoadingSpinner from "@/components/(loading)/LoadingSpinner";
import InlineError from "@/components/InlineError";

import Input from "@/components/(inputs)/Input";
import { useNotification } from "@/lib/hooks";
import { Theme } from "@/lib/types";
import { ZodSignInFormData } from "@/lib/validators";
import vezraLogo from "public/img/vezra-logo.png";
import { BsFillDiamondFill } from "react-icons/bs";

// -=-=-= Types -=-=-= //
export type SignInForm = z.infer<typeof ZodSignInFormData>;

type SignInFormProps = {
  //
};

// =-=-=- Main Component =-=-=- //
export default function SignInForm({}: SignInFormProps) {
  const auth = useAuth();
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const { notifications, notify, pausedAt } = useNotification();
  const theme: Theme = useContext(ThemeContext);

  useEffect(() => {
    if (auth.isLoaded && auth.isSignedIn) {
      router.push("/dashboard");
    }
  });

  const {
    register,
    watch,
    control,
    setValue,
    clearErrors,
    handleSubmit,
    formState,
  } = useForm<SignInForm>({
    resolver: zodResolver(ZodSignInFormData),
  });

  const [isFormDisabled, setIsFormDisabled] = useState(false);

  async function signInUser({ username, password }: SignInForm) {
    setIsFormDisabled(true);
    try {
      const res = await signIn!.create({
        identifier: username,
        password: password,
      });

      setActive!({ session: res.createdSessionId });
      //
    } catch (err: any) {
      if (err.errors) {
        notify.error(`${[err.errors[0].longMessage]}`);
      }

      setIsFormDisabled(false);
    }
  }

  return (
    <div className="absolute top-[100px] left-12 sm:left-32 md:left-1/3 max-w-[375px] bg-white shadow-lg shadow-zinc-700 overflow-hidden rounded-lg py-8 px-10 text-center justify-center items-center sm:px-12 md:px-[60px]">
      <Image
        className="mb-6"
        src={vezraLogo}
        alt="vezra logo"
        width={250}
        height={75}
      />
      <form onSubmit={handleSubmit(signInUser)} noValidate>
        <div className="mb-6">
          <Input<SignInForm, string>
            config={{
              id: "username",
              label: "Username",
              syncDisable: isFormDisabled,
              syncError: formState.errors.username?.message,
              syncValue: watch("username"),
              syncControl: control,
              syncSetValue: setValue,
              syncClearErrors: clearErrors,
              syncFnProps: () =>
                register("username", {
                  required: "Username is required",
                }),
            }}
            type="text"
            className="w-[250px]"
          />
          {formState.errors.username && (
            <InlineError errors={formState.errors.username.message} />
          )}
        </div>
        <div className="mb-5">
          <Input<SignInForm, string>
            config={{
              id: "password",
              label: "Password",
              syncDisable: isFormDisabled,
              syncError: formState.errors.password?.message,
              syncValue: watch("password"),
              syncControl: control,
              syncSetValue: setValue,
              syncClearErrors: clearErrors,
              syncFnProps: () =>
                register("password", {
                  required: "Password is required",
                }),
            }}
            type="password"
            autoComplete="off"
            className="w-[250px]"
          />
          {formState.errors.password && (
            <InlineError errors={formState.errors.password.message} />
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
