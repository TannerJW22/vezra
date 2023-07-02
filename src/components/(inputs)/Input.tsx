"use client";

import { ThemeContext } from "@/app/ThemeProvider";
import { InputHTMLAttributes, useContext } from "react";

// -=-=-= Types -=-=-= //
export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  //
};

// =-=-=- Main Component =-=-=- //
export default function Input({ className, ...props }: InputProps) {
  const theme = useContext(ThemeContext);

  return (
    //
    <input
      {...props}
      className={`${theme.input.base}`}
      //
    />
  );
}
