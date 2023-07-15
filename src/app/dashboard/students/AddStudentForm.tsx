"use client";

import { ThemeContext } from "@/app/ThemeProvider";
import { DateSelect, Input, SingleSelect } from "@/components/(inputs)";
import { LoadingSpinner } from "@/components/(loading)";
import InlineErrorController from "@/components/InlineErrorController";
import type { SubmitHandler } from "@/lib/types";
import { _baseURL_ } from "@/lib/utils";
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
    formState,
  } = useForm<AddStudentForm>({
    resolver: zodResolver(ZodAddStudentForm),
  });

  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [dbErrors, setDbErrors] = useState<string[]>([]);
  const theme = useContext(ThemeContext);

  const {
    mutate: postNewStudent,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: async (newPost: AddStudentForm) => {
      try {
        //
        const res = await axios.post(
          `${_baseURL_}/api/students`,
          JSON.stringify({
            lastName: newPost.lastName,
            firstName: newPost.firstName,
            grade: newPost.grade,
            dateEnrolled: newPost.dateEnrolled,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return res;
      } catch (err) {
        // // <<--| All error handling is done here.
        // Build custom Error messages into ZodValidator
        // Seems like useMutation handles everything and you dont use <form> onSubmit
        // After proof of concept you will need to integrate useMut into SignIn Page as well.
      }

      return;
    },
    // onSuccess: (data) => {}
    // onError: (err) => {}
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(postNewStudent as SubmitHandler<AddStudentForm>);
        }}
        noValidate
      >
        <div className="flex flex-col gap-6 mb-5 pt-5">
          <Input
            config={{
              id: "lastName",
              label: "Last Name",
              syncDisable: isFormDisabled,
              syncError: formState.errors.lastName?.message,
              syncValue: watch("lastName"),
              syncControl: control,
              syncSetValue: setValue,
              syncFnProps: () =>
                register("lastName", {
                  required: "Last Name is required",
                }),
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

          <Input
            config={{
              id: "firstName",
              label: "First Name",
              syncDisable: isFormDisabled,
              syncError: formState.errors.firstName?.message,
              syncValue: watch("firstName"),
              syncControl: control,
              syncSetValue: setValue,
              syncFnProps: () =>
                register("firstName", {
                  required: "First Name is required",
                }),
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
          <div className="flex gap-3">
            <SingleSelect<AddStudentForm, GradeEnum>
              config={{
                id: "grade",
                label: "Grade",
                choices: gradeEnum,
                syncControl: control,
                syncValue: watch("grade"),
                syncSetValue: setValue,
                syncDisable: isFormDisabled,
                syncError: formState.errors?.grade?.message,
                syncFnProps: () =>
                  register("grade", {
                    required: "Grade is required",
                  }),
              }}
              className="w-[110px]"
            />
            {formState.errors.grade && (
              <InlineErrorController
                type="zod"
                errors={formState.errors?.grade?.message}
              />
            )}
            <DateSelect<AddStudentForm, Date>
              config={{
                id: "dateEnrolled",
                label: "Enroll Date",
                syncControl: control,
                syncSetValue: setValue,
                syncValue: watch("dateEnrolled"),
                syncFnProps: () => register("dateEnrolled"),
                syncDisable: isFormDisabled,
                syncError: formState.errors?.dateEnrolled?.message,
              }}
              className="w-[178px]"
            />
            {formState.errors.dateEnrolled && (
              <InlineErrorController
                type="zod"
                errors={formState.errors?.dateEnrolled?.message}
              />
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className={theme.button.secondary}
            disabled={isFormDisabled}
          >
            {isFormDisabled ? <LoadingSpinner color="#FAFAFA" /> : "Submit Now"}
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
