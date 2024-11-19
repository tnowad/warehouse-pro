"use client";

import { ErrorFallback } from "@/components/error-fallback";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorFallback error={error} resetErrorBoundary={reset} />;
}
