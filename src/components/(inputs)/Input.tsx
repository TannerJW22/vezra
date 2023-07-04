"use client";

import { ThemeContext } from "@/app/ThemeProvider";
import { cn, toTitleCase } from "@/lib/utils";
import { InputHTMLAttributes, useContext } from "react";

// -=-=-= Types -=-=-= //
export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  config?: {
    syncError?: any;
    syncDisable?: string | string[] | boolean;
    syncValue?: string | number;
    syncFnProps?: () => any;
    customLabel?: string;
  };
};

// =-=-=- Main Component =-=-=- //
export default function Input({
  config = {},
  className,
  ...props
}: InputProps) {
  const theme = useContext(ThemeContext);

  return (
    //
    <div className="relative">
      <input
        {...(config.syncFnProps && config.syncFnProps())}
        {...props}
        className={cn(
          cn(theme.input.base, className),
          config?.syncDisable && theme.input.onDisable,
          config?.syncError && theme.input.onError
        )}
        //
      />
      <label
        className={cn(
          theme.label.placeholder,
          (config.syncValue || props.value) && theme.label.header
        )}
        htmlFor={props.id}
      >
        {config.customLabel || toTitleCase(props.id || "")}
      </label>
    </div>
  );
}
