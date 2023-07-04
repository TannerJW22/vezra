"use client";

import { Provider } from "react-redux";

import { store } from "@/store";

// -=-=-= Types -=-=-= //
export type ReduxProviderProps = {
  children: React.ReactNode;
};

// =-=-=- Main Component =-=-=- //
export default function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
