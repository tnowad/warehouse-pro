import React from "react";

type PermissionGuardProps<T> = {
  permissions: T[];
  requiredPermissions: T[] | T;
  children: React.ReactNode;
  operator?: "AND" | "OR";
  fallback?: React.ReactNode;
};

export function PermissionGuard<T>({
  permissions,
  requiredPermissions,
  children,
  operator = "AND",
  fallback = null,
}: PermissionGuardProps<T>) {
  const requiredPermissionsArray = Array.isArray(requiredPermissions)
    ? requiredPermissions
    : [requiredPermissions];

  const hasPermission =
    operator === "AND"
      ? requiredPermissionsArray.every((perm) => permissions.includes(perm))
      : requiredPermissionsArray.some((perm) => permissions.includes(perm));

  return hasPermission ? <>{children}</> : <>{fallback}</>;
}
