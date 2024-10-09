"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IconName, Icons } from "../icons";

type NavigationItem = {
  title: string;
  href: string;
  icon?: IconName;
  disabled?: boolean;
};

type NavigationMenuProps = {
  items: NavigationItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
};

export function NavigationMenu({
  items,
  setOpen,
  isMobileNav = false,
}: NavigationMenuProps) {
  const path = usePathname();
  const { isMinimized } = useSidebar();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      <TooltipProvider>
        {items.map((item, index) => {
          const Icon = item.icon ? Icons[item.icon] : Icons.logo;

          return (
            item.href && (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.disabled ? "/" : item.href}
                    className={cn(
                      "flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      path === item.href ? "bg-accent" : "transparent",
                      item.disabled && "cursor-not-allowed opacity-80",
                    )}
                    onClick={() => setOpen && setOpen(false)}
                  >
                    <Icon className={`ml-3 size-5 flex-none`} />
                    {(isMobileNav || (!isMinimized && !isMobileNav)) && (
                      <span className="mr-2 truncate">{item.title}</span>
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  align="center"
                  side="right"
                  sideOffset={8}
                  className={!isMinimized ? "hidden" : "inline-block"}
                >
                  {item.title}
                </TooltipContent>
              </Tooltip>
            )
          );
        })}
      </TooltipProvider>
    </nav>
  );
}
