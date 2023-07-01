"use client";

import { LoadingSpinner } from "@/components/(loading)";
import { theme } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ZodAddStudentForm } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// -=-=-= Types -=-=-= //
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
        <div className="flex flex-col gap-5 mb-5">
          <input
            autoComplete="off"
            disabled={isFormDisabled}
            className={cn(
              theme.input.base,
              isFormDisabled && theme.input.onDisable
              // formState.errors.password && theme.input.onError
            )}
            id="lastName"
            type="text"
            placeholder=" Last Name"
            // {...register("username", {
            //   required: "Username is required",
            // })}
          />
          {/* {formState.errors.username && (
            <InlineErrorController
              type="zod"
              errors={formState.errors.username.message}
            />
          )} */}

          <input
            autoComplete="off"
            disabled={isFormDisabled}
            className={cn(
              theme.input.base,
              isFormDisabled && theme.input.onDisable
              // formState.errors.password && theme.input.onError
            )}
            id="firstName"
            type="text"
            placeholder=" First Name"
            // {...register("username", {
            //   required: "Username is required",
            // })}
          />
          {/* {formState.errors.username && (
            <InlineErrorController
              type="zod"
              errors={formState.errors.username.message}
            />
          )} */}
          {/* // <<--| Replace below input w/ Dropdown & Change Typing to Enum */}
          <input
            autoComplete="off"
            disabled={isFormDisabled}
            className={cn(
              theme.input.base,
              isFormDisabled && theme.input.onDisable
              // formState.errors.password && theme.input.onError
            )}
            id="grade"
            type="text"
            placeholder=" Grade"
            // {...register("username", {
            //   required: "Username is required",
            // })}
          />
          {/* {formState.errors.username && (
            <InlineErrorController
              type="zod"
              errors={formState.errors.username.message}
            />
          )} */}
          {/* // <<--| Replace below input w/ Calender Picker */}
          <input
            autoComplete="off"
            disabled={isFormDisabled}
            className={cn(
              theme.input.base,
              isFormDisabled && theme.input.onDisable
              // formState.errors.password && theme.input.onError
            )}
            id="date"
            type="text"
            placeholder=" Date"
            // {...register("username", {
            //   required: "Username is required",
            // })}
          />
          {/* {formState.errors.username && (
            <InlineErrorController
              type="zod"
              errors={formState.errors.username.message}
            />
          )} */}
        </div>

        <div className="flex gap-2 border border-red-500">
          <button className={theme.button.secondary} disabled={isFormDisabled}>
            {isFormDisabled ? <LoadingSpinner color="#FAFAFA" /> : "Add Now"}
          </button>
          <button className={theme.button.primary} disabled={isFormDisabled}>
            {isFormDisabled ? <LoadingSpinner color="#FAFAFA" /> : "Continue"}
          </button>
        </div>
        {/* {!isFormDisabled && (
          <InlineErrorController type="server" errors={clerkErrors} />
        )} */}
      </form>
    </div>
  );
}
