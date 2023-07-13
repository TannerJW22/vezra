"use client";

import { ThemeContext } from "@/app/ThemeProvider";
import { DateSelect, Input, SingleSelect } from "@/components/(inputs)";
import { LoadingSpinner } from "@/components/(loading)";
import InlineErrorController from "@/components/InlineErrorController";
import { ZodAddStudentForm, gradeEnum } from "@/lib/validators";
import { GradeEnum } from "@/models/Student";
import { zodResolver } from "@hookform/resolvers/zod";
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
  const { register, watch, setValue, control, handleSubmit, formState } =
    useForm<AddStudentForm>({
      resolver: zodResolver(ZodAddStudentForm),
    });

  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [dbErrors, setDbErrors] = useState<string[]>([]);
  const theme = useContext(ThemeContext);

  // <<--| Learn about React Query in a vacuum and then make into the Next API integration.
  // const {} = useMutation({
  //   lastName: "TestLastName",
  //   firstName: "TestFirstName",
  //   grade: "3" as GradeEnum,
  //   dateEnrolled: new Date(),
  // });

  return (
    <div>
      <form onSubmit={() => alert("")} noValidate>
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
              errors={formState.errors.lastName.message}
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
              errors={formState.errors.firstName.message}
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
          </div>
        </div>

        <div className="flex gap-2">
          <button className={theme.button.secondary} disabled={isFormDisabled}>
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
