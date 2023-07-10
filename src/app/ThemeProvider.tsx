"use client";

import { createContext, useState } from "react";

// -=-=-= Types -=-=-= //
export const ThemeContext = createContext({} as Theme);

export type Theme = {
  input: {
    base: string;
    onDisable: string;
    onError: string;
    label: {
      placeholder: string;
      header: string;
    };
  };
  singleSelect: {
    base: string;
    menu: string;
    menuItem: string;
    onDisable: string;
    onError: string;
    label: {
      placeholder: string;
      header: string;
    };
    arrow: string;
  };
  button: {
    primary: string;
    secondary: string;
  };
};

export type ThemeProviderProps = {
  children: React.ReactNode;
};

// =-=-=- Main Component =-=-=- //
export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [value, setValue] = useState<Theme>({
    input: {
      base: "peer px-3 pt-1 outline-none border border-zinc-300 w-[250px] h-[46px] hover:bg-light-100 focus:bg-light-100 active:bg-light-100 focus:border-b-2 focus:border-x-0 focus:border-t-0 focus:border-primary-500 appearance-none focus:outline-none",
      onDisable:
        "bg-zinc-200 hover:bg-zinc-200 focus:bg-zinc-200 active:bg-zinc-200",
      onError:
        "border-l-8 border-t-0 border-b-2 border-r-0 border-red-600 focus:border-l-8 focus:border-t-0 focus:border-b-2 focus:border-r-0 focus:rounded-b-none focus:border-red-600",
      label: {
        placeholder:
          "absolute left-1 peer-focus:p-0 peer-focus:pl-0 peer-focus:pr-3 peer-focus:rounded-lg peer-focus:-translate-y-3 peer-focus:translate-x-3 peer-focus:text-primary-500 peer-focus:text-[14px] peer-focus:font-medium peer-focus:bg-white text-slate-400 left-0 p-[0.8em] ml-[0.5em] peer-focus:tracking-wide pointer-events-none transition-all duration-75",
        header:
          "text-primary-500 font-medium translate-x-1 -translate-y-3 peer-focus:-translate-y-3 peer-focus:translate-x-3 peer-focus:bg-white peer-focus:font-medium text-[14px] tracking-wide bg-white p-0 px-2 rounded-lg",
      },
    },
    singleSelect: {
      base: "relative peer z-0 px-3 pt-1 outline-none border border-zinc-300 w-[125px] h-[46px] hover:bg-light-100 focus:border-none appearance-none focus:outline-none cursor-pointer",
      menu: "absolute z-10 top-[14px] left-0 border shadow-md min-w-[125px]",
      menuItem: "px-4 py-1.5 bg-light-100 hover:bg-primary-75 cursor-pointer",
      onDisable:
        "bg-zinc-200 hover:bg-zinc-200 focus:bg-zinc-200 active:bg-zinc-200",
      onError:
        "border-l-8 border-t-0 border-b-2 border-r-0 border-red-600 focus:border-l-8 focus:border-t-0 focus:border-b-2 focus:border-r-0 focus:rounded-b-none focus:border-red-600",
      label: {
        placeholder:
          "absolute left-1 peer-focus:p-0 peer-focus:pl-0 peer-focus:pr-3 peer-focus:rounded-lg peer-focus:-translate-y-3 peer-focus:translate-x-3 peer-focus:text-primary-500 peer-focus:text-[14px] peer-focus:font-medium peer-focus:bg-white text-slate-400 left-0 p-[0.8em] ml-[0.5em] peer-focus:tracking-wide transition-all duration-75",
        header:
          "text-primary-500 font-medium translate-x-1 -translate-y-3 peer-focus:-translate-y-3 peer-focus:translate-x-3 peer-focus:bg-white peer-focus:font-medium text-[14px] tracking-wide bg-white p-0 px-2 rounded-lg",
      },
      arrow:
        "text-[13px] text-slate-400 absolute hidden top-4 right-3 peer-hover:block cursor-pointer",
    },
    button: {
      primary:
        "flex items-center text-center justify-center w-[125px] bg-primary-300 tracking-normal cursor-pointer rounded-md py-[4px] px-4 text-base text-light-100 font-normal transition shadow-md shadow-zinc-200 hover:shadow-zinc-300 hover:bg-primary-500 active:translate-y-[1px] active:shadow-none whitespace-nowrap",
      secondary:
        "flex items-center text-center justify-center w-[125px] bg-light-100 tracking-normal cursor-pointer rounded-md py-[4px] px-4 text-base text-primary-500 border-[1.5px] border-primary-500 font-normal transition shadow-md shadow-zinc-200 hover:shadow-zinc-300 hover:bg-primary-75 hover:text-primary-700 active:translate-y-[1px] active:shadow-none whitespace-nowrap",
    },
  });

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
