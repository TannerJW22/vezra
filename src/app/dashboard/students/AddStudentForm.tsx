"use client";

import { ThemeContext } from "@/app/ThemeProvider";
import Input from "@/components/(inputs)/Input";
import SingleSelect from "@/components/(inputs)/SingleSelect";
import { LoadingSpinner } from "@/components/(loading)";
import InlineErrorController from "@/components/InlineErrorController";
import { cn, enumToChoicesAdaptor } from "@/lib/utils";
import { ZodAddStudentForm, gradeEnum } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
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
  const { register, watch, control, handleSubmit, formState } =
    useForm<AddStudentForm>({
      resolver: zodResolver(ZodAddStudentForm),
    });

  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [dbErrors, setDbErrors] = useState<string[]>([]);
  const theme = useContext(ThemeContext);

  return (
    //
    //
    <div>
      <form onSubmit={handleSubmit(postNewStudent)} noValidate>
        <div className="flex flex-col gap-6 mb-5 pt-5">
          <Input
            config={{
              syncDisable: isFormDisabled,
              syncError: formState.errors.lastName?.message,
              syncValue: watch("lastName"),
              syncFnProps: () =>
                register("lastName", {
                  required: "Last Name is required",
                }),
            }}
            autoComplete="off"
            disabled={isFormDisabled}
            id="Last Name"
            type="text"
          />
          {formState.errors.lastName && (
            <InlineErrorController
              type="zod"
              errors={formState.errors.lastName.message}
            />
          )}

          <Input
            config={{
              syncDisable: isFormDisabled,
              syncError: formState.errors.firstName?.message,
              syncValue: watch("firstName"),
              syncFnProps: () =>
                register("firstName", {
                  required: "First Name is required",
                }),
            }}
            autoComplete="off"
            disabled={isFormDisabled}
            id="First Name"
            type="text"
          />
          {formState.errors.firstName && (
            <InlineErrorController
              type="zod"
              errors={formState.errors.firstName.message}
            />
          )}

          <SingleSelect
            name="grade"
            choices={enumToChoicesAdaptor(gradeEnum)}
            control={control}
          />
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
