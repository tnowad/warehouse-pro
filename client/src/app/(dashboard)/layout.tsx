"use client";
import { Header } from "@/components/layout/header";
import { PermissionGuard } from "../_components/permission-guard";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getQueryClient } from "../get-query-client";
import { LogInIcon, RefreshCwIcon } from "lucide-react";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <PermissionGuard
      required={["AUTH_LOGGED_IN"]}
      handlers={{
        unauthorized: () => {
          return (
            <div className="flex justify-center items-center min-h-screen">
              <Card className="my-auto mx-auto max-w-screen-sm w-full">
                <CardHeader>
                  <CardTitle>
                    <span>Unauthorized</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    You are not authorized to view this page. Please login to
                    continue.
                  </p>
                </CardContent>
                <CardFooter className="space-x-1 justify-end">
                  <Button
                    onClick={() => {
                      const queryClient = getQueryClient();
                      queryClient.resetQueries({
                        queryKey: ["current-user-permissions"],
                      });
                      router.refresh();
                    }}
                    variant={"outline"}
                  >
                    <RefreshCwIcon />
                    Refresh
                  </Button>
                  <Button onClick={() => router.push("/login")}>
                    <LogInIcon />
                    Login
                  </Button>
                </CardFooter>
              </Card>
            </div>
          );
        },
        error: (error) => <div>Error: {error.message}</div>,
      }}
    >
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="w-full overflow-x-hidden">
          <Header />
          <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </PermissionGuard>
  );
}
