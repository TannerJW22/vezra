"use client";

import type { Control, FieldValues } from "@/lib/types";

import { cn, toTitleCase } from "@/lib/utils";
import { ChangeEvent, useState } from "react";

import { Controller } from "react-hook-form";
import { z } from "zod";

// import {
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

const FormSchema = z.object({
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
});

// -=-=-= Types & Validators -=-=-= //
type SelectChoice = {
  label: string;
  value: string;
};

type SingleSelectProps = {
  name: string;
  control: unknown;
  description?: string;
  choices: SelectChoice[];
};

// =-=-=- Main Component =-=-=- //
export default function SingleSelect({
  name,
  control,
  description,
  choices,
}: SingleSelectProps) {
  const [selectedChoice, setSelectedChoice] = useState("");

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedChoice(event.target.value);
  };

  return (
    <Controller
      name={name}
      control={control as Control<FieldValues>}
      rules={{ required: true }}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <div className=" px-2 flex flex-row-reverse justify-end gap-4 items-center">
          <div className="peer flex justify-center items-center w-[125px] h-[46px] border border-zinc-300 hover:bg-light-100 focus:bg-light-100">
            <select
              className="bg-transparent"
              value={selectedChoice}
              onChange={handleChange}
            >
              <option className="bg-transparent" value="">
                Select...
              </option>
              {choices.map((choice) => (
                <option className="bg-transparent" value={choice.value}>
                  {toTitleCase(String(choice.label))}
                </option>
              ))}
            </select>
          </div>
          <label
            className={cn(
              "text-slate-400 peer-hover:text-primary-500",
              selectedChoice !== "" && "text-primary-500 font-medium"
            )}
          >
            {toTitleCase(name)}
          </label>
        </div>
      )}
    />

    // <FormField
    //   control={control}
    //   name="email"
    //   // @ts-ignore
    //   render={({ field }) => (
    //     <FormItem>
    //       <FormLabel>Email</FormLabel>
    //       <Select onValueChange={field.onChange} defaultValue={field.value}>
    //         <FormControl>
    //           <SelectTrigger>
    //             <SelectValue placeholder="Select a verified email to display" />
    //           </SelectTrigger>
    //         </FormControl>
    //         <SelectContent>
    //           {choices.map(({ value, label }: SelectChoice) => {
    //             <SelectItem value={value}>{label}</SelectItem>;
    //           })}
    //         </SelectContent>
    //       </Select>
    //       <FormDescription>{description}</FormDescription>
    //       <FormMessage />
    //     </FormItem>
    //   )}
    // />
  );
}
