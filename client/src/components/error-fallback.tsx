import React from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <Alert variant="destructive" role="alert">
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription>
        <pre>{error.message}</pre>
      </AlertDescription>
      <Button onClick={resetErrorBoundary} variant="secondary">
        Try again
      </Button>
    </Alert>
  );
}
