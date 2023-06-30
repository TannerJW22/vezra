"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// -=-=-= Types -=-=-= //
export const ZodAddStudentForm = z.object({
  // username: z.string().nonempty(),
  // password: z.string().nonempty(),
});
export type AddStudentForm = z.infer<typeof ZodAddStudentForm>;

type AddStudentFormProps = {
  postNewStudent: () => Promise<void>;
};

// =-=-=- Main Component =-=-=- //
export default function AddStudentForm({
  postNewStudent,
}: AddStudentFormProps) {
  const { register, control, handleSubmit, formState } =
    useForm<AddStudentForm>({
      resolver: zodResolver(ZodAddStudentForm),
    });

  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [dbErrors, setDbErrors] = useState<string[]>([]);

  return (
    //
    //
    <div>
      <form onSubmit={handleSubmit(postNewStudent)} noValidate>
        {/* <div className="mb-5">
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
				{!isFormDisabled && <InlineErrorController type="server" errors={clerkErrors} />} */}
      </form>
    </div>
  );
}
