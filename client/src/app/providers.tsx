"use client";
import { Toaster } from "@/components/ui/toaster";
import { CurrentUserStoreProvider } from "@/providers/current-user-store-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CurrentUserStoreProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster />
      </QueryClientProvider>
    </CurrentUserStoreProvider>
  );
}
