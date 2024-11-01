"use client";
import { Header } from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { getCurrentUserPermissionsQueryOptions } from "@/hooks/queries/get-current-user-permissions.query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { PermissionGuard } from "../_components/permission-guard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isError } = useSuspenseQuery(
    getCurrentUserPermissionsQueryOptions,
  );

  if (!data || isError) {
    redirect("/login");
  }

  return (
    <PermissionGuard
      permissions={data.permissions}
      requiredPermissions={"VIEW_DASHBOARD"}
      fallback={<div>Unauthorized</div>}
    >
      <div className="flex">
        <Sidebar />
        <main className="w-full flex-1 overflow-hidden">
          <Header />
          {children}
        </main>
      </div>
    </PermissionGuard>
  );
}
