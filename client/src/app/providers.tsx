"use client";
import { Toaster } from "@/components/ui/toaster";
import {
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "./get-query-client";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>
        {children}
        <Toaster />
      </QueryErrorResetBoundary>
    </QueryClientProvider>
  );
}
