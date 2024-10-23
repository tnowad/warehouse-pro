"use client";
import { Header } from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { currentUser, isLoading } = useCurrentUser();

  if (isLoading) {
    return null;
  }

  if (!currentUser) {
    router.push("/login");
    return null;
  }

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
