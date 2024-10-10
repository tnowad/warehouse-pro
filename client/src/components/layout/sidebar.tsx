"use client";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { ChevronLeft, WarehouseIcon } from "lucide-react";
import Link from "next/link";
import { NavigationMenu } from "./navigation-menu";

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();

  const handleToggle = () => {
    toggle();
  };

  return (
    <aside
      className={cn(
        `relative  hidden h-screen flex-none border-r bg-card transition-[width] duration-500 md:block`,
        !isMinimized ? "w-72" : "w-[72px]",
        className,
      )}
    >
      <div className="hidden p-5 pt-10 lg:block">
        <Link href={"/"} target="_blank">
          <WarehouseIcon />
        </Link>
      </div>
      <ChevronLeft
        className={cn(
          "absolute -right-3 top-10 z-50  cursor-pointer rounded-full border bg-background text-3xl text-foreground",
          isMinimized && "rotate-180",
        )}
        onClick={handleToggle}
      />
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <NavigationMenu
              items={[
                {
                  title: "Dashboard",
                  href: "/",
                  icon: "dashboard",
                },
                {
                  title: "Warehouses",
                  href: "/warehouses",
                  icon: "warehouse",
                },
                {
                  title: "Products",
                  href: "/products",
                  icon: "product",
                },
                {
                  title: "Settings",
                  href: "/settings",
                  icon: "settings",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
