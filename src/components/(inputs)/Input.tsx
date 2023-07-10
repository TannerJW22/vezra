"use client";

import { ThemeContext } from "@/app/ThemeProvider";
import { cn } from "@/lib/utils";
import { InputHTMLAttributes, useContext } from "react";

// -=-=-= Types -=-=-= //
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  config: {
    id: string;
    label: string;
    syncFnProps: () => any;
    syncValue: string | number;
    syncError?: any;
    syncDisable?: string | string[] | boolean;
  };
};

// =-=-=- Main Component =-=-=- //
export default function Input({ config, className, ...props }: InputProps) {
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
