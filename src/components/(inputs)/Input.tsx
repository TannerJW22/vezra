"use client";

import type { Control, FieldValues, UseFormSetValue } from "@/lib/types";

import { ThemeContext } from "@/app/ThemeProvider";
import { cn } from "@/lib/utils";
import { InputHTMLAttributes, useContext } from "react";

// -=-=-= Types -=-=-= //
type InputProps<
  TFormSchema extends FieldValues,
  TInputValue
> = InputHTMLAttributes<HTMLInputElement> & {
  config: {
    id: string;
    label: string;
    syncFnProps: () => any;
    syncValue: TInputValue;
    syncSetValue: UseFormSetValue<TFormSchema>;
    syncControl: Control<TFormSchema>;
    syncError?: any;
    syncDisable?: string | string[] | boolean;
  };
};

// =-=-=- Main Component =-=-=- //
export default function Input<TFormSchema extends FieldValues, TInputValue>({
  config,
  className,
  ...props
}: InputProps<TFormSchema, TInputValue>) {
  const theme = useContext(ThemeContext);

  return (
    //
    <div className="relative">
      <input
        {...config.syncFnProps()}
        {...props}
        id={config.id}
        disabled={config.syncDisable}
        className={cn(
          cn(theme.input.base, className),
          config?.syncDisable && theme.input.onDisable,
          config?.syncError && theme.input.onError
        )}
        //
      />
      <label
        className={cn(
          theme.input.label.placeholder,
          config.syncValue && theme.input.label.header
        )}
        htmlFor={config.id}
      >
        {config.label}
      </label>
    </div>
  );
}
