"use client";
import { Header } from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { useCurrentUserStore } from "@/providers/current-user-store-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useCurrentUserStore((state) => state.user);

  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full flex-1 overflow-hidden">
        {JSON.stringify(user)}
        <Header />
        {children}
      </main>
    </div>
  );
}
