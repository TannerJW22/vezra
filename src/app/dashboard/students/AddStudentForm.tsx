"use client";

import { ThemeContext } from "@/app/ThemeProvider";
import { DateSelect, Input, SingleSelect } from "@/components/(inputs)";
import { LoadingSpinner } from "@/components/(loading)";
import InlineErrorController from "@/components/InlineErrorController";
import { _baseURL_, cn } from "@/lib/utils";
import { ZodAddStudentForm, gradeEnum } from "@/lib/validators";
import { GradeEnum } from "@/models/Student";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// -=-=-= Types -=-=-= //
export type AddStudentForm = z.infer<typeof ZodAddStudentForm>;

export type VezraError = {
  status: number;
  message: string;
};

type AddStudentFormProps = {
  //
};

// =-=-=- Main Component =-=-=- //
export default function AddStudentForm({}: AddStudentFormProps) {
  const {
    register,
    watch,
    setValue,
    control,
    getValues,
    handleSubmit,
    trigger,
    formState,
    clearErrors,
  } = useForm<AddStudentForm>({
    resolver: zodResolver(ZodAddStudentForm),
  });

  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const theme = useContext(ThemeContext);

  const {
    mutate,
    isError: mutateIsError,
    isLoading: mutateIsLoading,
    isSuccess: mutateIsSuccess,
  } = useMutation({
    mutationFn: async (values: AddStudentForm) => {
      // Validation Step
      if (!(await trigger()))
        throw new Error("AddStudentForm Validation failed.");

      try {
        // Attempt Post Request on Successful Validation
        const res = await axios.post(
          `${_baseURL_}/api/students`,
          JSON.stringify({
            lastName: values.lastName,
            firstName: values.firstName,
            grade: values.grade,
            dateEnrolled: values.dateEnrolled,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return res;
      } catch (err) {
        // Catches Post-Validation Errors (Server, Network, etc.)
        // <<--| Global Notifications / Toast
        throw new Error("Internal Server Error");
      }

      return;
    },
    onSuccess: (data) => {
      setIsFormDisabled(false);
      // <<--| Global Notifications / Toast
    },
    onError: (err) => {
      // <<--| Catches Validation Error thrown above.
      // grab message and push to Notification System / Toast
      alert("mutate().onError() callback triggered");
      setIsFormDisabled(false);
    },
  });

  return (
    <div className="pt-4 px-3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsFormDisabled(true);
          mutate(getValues());
        }}
        noValidate
      >
        <div className="flex flex-col gap-6 mb-8 pt-5">
          <div className="flex flex-col">
            <Input
              config={{
                id: "lastName",
                label: "Last Name",
                syncDisable: isFormDisabled,
                syncError: formState.errors?.lastName?.message,
                syncValue: watch("lastName"),
                syncControl: control,
                syncSetValue: setValue,
                syncClearErrors: clearErrors,
                syncFnProps: () => register("lastName"),
              }}
              autoComplete="off"
              type="text"
            />
            {formState.errors.lastName && (
              <InlineErrorController
                type="zod"
                errors={formState.errors?.lastName?.message}
              />
            )}
          </div>

          <div className="flex flex-col">
            <Input
              config={{
                id: "firstName",
                label: "First Name",
                syncDisable: isFormDisabled,
                syncError: formState.errors?.firstName?.message,
                syncValue: watch("firstName"),
                syncControl: control,
                syncSetValue: setValue,
                syncClearErrors: clearErrors,
                syncFnProps: () => register("firstName"),
              }}
              autoComplete="off"
              type="text"
            />
            {formState.errors.firstName && (
              <InlineErrorController
                type="zod"
                errors={formState.errors?.firstName?.message}
              />
            )}
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col">
              <SingleSelect<AddStudentForm, GradeEnum>
                config={{
                  id: "grade",
                  label: "Grade",
                  choices: gradeEnum,
                  syncControl: control,
                  syncValue: watch("grade"),
                  syncSetValue: setValue,
                  syncClearErrors: clearErrors,
                  syncDisable: isFormDisabled,
                  syncError: formState.errors?.grade?.message,
                  syncFnProps: () => register("grade"),
                }}
              />
              {formState.errors.grade && (
                <InlineErrorController
                  type="zod"
                  errors={formState.errors?.grade?.message}
                />
              )}
            </div>
            <div className="flex flex-col">
              <DateSelect<AddStudentForm, Date>
                config={{
                  id: "dateEnrolled",
                  label: "Enroll Date",
                  syncControl: control,
                  syncValue: watch("dateEnrolled"),
                  syncSetValue: setValue,
                  syncClearErrors: clearErrors,
                  syncDisable: isFormDisabled,
                  syncError: formState.errors?.dateEnrolled?.message,
                  syncFnProps: () => register("dateEnrolled"),
                }}
                className="w-[160px]"
              />
              {formState.errors.dateEnrolled && (
                <InlineErrorController
                  type="zod"
                  errors={formState.errors?.dateEnrolled?.message}
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          <button
            type="submit"
            className={cn(theme.button.secondary, "w-[140px]")}
            disabled={isFormDisabled}
          >
            {isFormDisabled ? (
              <LoadingSpinner color="#FAFAFA" />
            ) : (
              "Save & Close"
            )}
          </button>
          <button
            className={cn(theme.button.primary, "w-[165px]")}
            disabled={isFormDisabled}
          >
            {isFormDisabled ? (
              <LoadingSpinner color="#FAFAFA" />
            ) : (
              "Save & Continue"
            )}
          </button>
        </div>
        {/* {!isFormDisabled && (
          <InlineErrorController type="server" errors={clerkErrors} />
        )} */}
      </form>
    </div>
  );
}
