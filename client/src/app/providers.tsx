"use client";
import { Toaster } from "@/components/ui/toaster";
import { CurrentUserStoreProvider } from "@/providers/current-user-store-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "./get-query-client";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <CurrentUserStoreProvider>{children}</CurrentUserStoreProvider>;
}
