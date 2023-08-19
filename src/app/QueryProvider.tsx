"use client";

import { useNotification } from "@/lib/hooks";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// -=-=-= Types & Constants -=-=-= //

type QueryClientProviderProps = {
  children: React.ReactNode;
};

// =-=-=- Main Component =-=-=- //
export default function QueryProvider({ children }: QueryClientProviderProps) {
  const { notify, notifications, pausedAt } = useNotification();

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        notify.error("Internal Server Error. Please Try Again.");
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
