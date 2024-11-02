"use client";
import { Header } from "@/components/layout/header";
import { getCurrentUserPermissionsQueryOptions } from "@/hooks/queries/get-current-user-permissions.query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { PermissionGuard } from "../_components/permission-guard";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

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
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <div className="flex flex-1 flex-col gap-4 p-4">
            {children}
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </PermissionGuard>
  );
}
