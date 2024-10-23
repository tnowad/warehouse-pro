"use client";
import { Header } from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { useGetCurrentUserQuery } from "@/hooks/apis/auth";
import { useCurrentUserActions } from "@/hooks/use-current-user";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isError, isLoading } = useGetCurrentUserQuery();
  const { setCurrentUser } = useCurrentUserActions();
  if (isLoading) return null;

  if (!data || isError) {
    redirect("/login");
  }

  setCurrentUser(data);

  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full flex-1 overflow-hidden">
        <Header />
        {children}
      </main>
    </div>
  );
}
