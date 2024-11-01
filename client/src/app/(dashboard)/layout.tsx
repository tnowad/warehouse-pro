"use client";
import { Header } from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { getCurrentUserPermissionsQueryOptions } from "@/hooks/queries/get-current-user-permissions.query";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { PermissionGuard } from "../_components/permission-guard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isError, isLoading, error } = useQuery(
    getCurrentUserPermissionsQueryOptions,
  );
  if (isLoading) return null;
  console.log(error);

  if (!data || isError) {
    redirect("/login");
  }

  return (
    <PermissionGuard
      permissions={data.permissions}
      requiredPermissions={"VIEW_DASHBOARD"}
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
