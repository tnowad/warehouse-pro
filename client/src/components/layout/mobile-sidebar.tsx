"use client";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { NavigationMenu } from "./navigation-menu";

export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left" className="!px-0 bg-card">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Overview
              </h2>
              <div className="space-y-1">
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
                  isMobileNav={true}
                  setOpen={setOpen}
                />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
