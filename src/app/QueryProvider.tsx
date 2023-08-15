"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

// -=-=-= Types & Constants -=-=-= //

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error("Internal Server Error. Please Try Again.");
    },
  }),
});

type QueryClientProviderProps = {
  children: React.ReactNode;
};

// =-=-=- Main Component =-=-=- //
export default function QueryProvider({ children }: QueryClientProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
