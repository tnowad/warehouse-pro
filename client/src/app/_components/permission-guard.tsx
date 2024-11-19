"use client";

import { ReactNode, useMemo, useState, useEffect } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getCurrentUserPermissionsQueryOptions } from "@/hooks/queries/get-current-user-permissions.query";
import { PermissionName } from "@/lib/schemas/permission.schema";
import { GetCurrentUserErrorResponseSchema } from "@/lib/api/schemas/get-current-user-schema";

type PermissionGuardProps = {
  required: PermissionName[];
  children: ReactNode;
  operator?: "AND" | "OR";
  handlers?: {
    unauthorized?: () => ReactNode | void;
    error?: (error: GetCurrentUserErrorResponseSchema) => ReactNode | void;
  };
};

export function PermissionGuard({
  required,
  children,
  operator = "AND",
  handlers,
}: PermissionGuardProps): JSX.Element | null {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data, error } = useSuspenseQuery(
    getCurrentUserPermissionsQueryOptions,
  );

  const permissions = useMemo(() => data?.items ?? [], [data]);

  const hasPermissions = useMemo(() => {
    if (permissions.length === 0) return false;
    return operator === "AND"
      ? required.every((perm) => permissions.includes(perm))
      : required.some((perm) => permissions.includes(perm));
  }, [permissions, required, operator]);

  if (!isClient) return null;

  if (error) {
    const result = handlers?.error?.(error);
    if (result) return <>{result}</>;
    return null;
  }

  if (!hasPermissions) {
    const result = handlers?.unauthorized?.();
    if (result) return <>{result}</>;
    return null;
  }

  return <>{children}</>;
}
