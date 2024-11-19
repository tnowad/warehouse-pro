"use client";
import { Header } from "@/components/layout/header";
import { PermissionGuard } from "../_components/permission-guard";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Suspense } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <PermissionGuard
      required={["DASHBOARD_VIEW"]}
      handlers={{
        unauthorized: () => router.push("/login"),
        error: (error) => <div>Error: {error.message}</div>,
      }}
    >
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </PermissionGuard>
  );
}
