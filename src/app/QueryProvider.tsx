"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// -=-=-= Types & Constants -=-=-= //

const queryClient = new QueryClient();

type QueryClientProviderProps = {
  children: React.ReactNode;
};

// =-=-=- Main Component =-=-=- //
export default function QueryProvider({ children }: QueryClientProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
