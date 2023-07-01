// -=-=-= Types & Validators -=-=-= //
export type Theme = {
  input: {
    base: string;
    onDisable: string;
    onError: string;
  };
  button: {
    primary: string;
    secondary: string;
  };
};

export const theme: Theme = {
  input: {
    base: "px-2 outline-none border border-zinc-300 w-[250px] h-10 hover:bg-light-100 focus:bg-light-100 active:bg-light-100 focus:border-b-2 focus:border-x-0 focus:border-t-0 focus:border-primary-500",
    onDisable:
      "bg-zinc-200 hover:bg-zinc-200 focus:bg-zinc-200 active:bg-zinc-200",
    onError:
      "border-l-8 border-t-0 border-b-2 border-r-0 border-red-600 focus:border-l-8 focus:border-t-0 focus:border-b-2 focus:border-r-0 focus:rounded-b-none focus:border-red-600",
  },
  button: {
    primary:
      "flex items-center text-center justify-center w-[125px] bg-primary-300 tracking-normal cursor-pointer rounded-md py-[4px] px-4 text-base text-light-100 font-normal transition shadow-md shadow-zinc-200 hover:shadow-zinc-300 hover:bg-primary-500 active:translate-y-[1px] active:shadow-none",
    secondary:
      "flex items-center text-center justify-center w-[125px] bg-light-100 tracking-normal cursor-pointer rounded-md py-[4px] px-4 text-base text-primary-500 border-[1.5px] border-primary-500 font-normal transition shadow-md shadow-zinc-200 hover:shadow-zinc-300 hover:bg-primary-75 hover:text-primary-700 active:translate-y-[1px] active:shadow-none",
  },
};
