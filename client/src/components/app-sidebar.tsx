import { GalleryVerticalEnd, Minus, Plus } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { PermissionGuard } from "@/app/_components/permission-guard";
import { Fragment } from "react";
import { PermissionName } from "@/lib/schemas/permission.schema";

const mainNav: {
  title: string;
  url: string;
  permission: PermissionName;
  icon: string;
}[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    permission: "AUDIT_LOG_VIEW",
    icon: "dashboard",
  },
  {
    title: "Users",
    url: "/users",
    permission: "USER_LIST",
    icon: "users",
  },
  {
    title: "Roles",
    url: "/roles",
    permission: "ROLE_LIST",
    icon: "roles",
  },
  {
    title: "Warehouses",
    url: "/warehouses",
    permission: "WAREHOUSE_LIST",
    icon: "warehouse",
  },
  {
    title: "Inventory Overview",
    url: "/inventory",
    permission: "INVENTORY_PRODUCT_LIST",
    icon: "inventory",
  },
  {
    title: "Low Stock Alerts",
    url: "/inventory/alerts",
    permission: "INVENTORY_LOW_STOCK_ALERT",
    icon: "inventory",
  },
  {
    title: "Orders",
    url: "/orders",
    permission: "ORDER_LIST",
    icon: "orders",
  },
  {
    title: "Track Orders",
    url: "/orders/status",
    permission: "ORDER_STATUS_TRACK",
    icon: "orders",
  },
  {
    title: "Assign Shipment",
    url: "/orders/assign-shipment",
    permission: "ORDER_ASSIGN_SHIPMENT",
    icon: "orders",
  },
  {
    title: "Suppliers",
    url: "/suppliers",
    permission: "PROCUREMENT_SUPPLIER_LIST",
    icon: "procurement",
  },
  {
    title: "Procurement Orders",
    url: "/procurements",
    permission: "PROCUREMENT_ORDER_LIST",
    icon: "procurement",
  },
  {
    title: "Shipments",
    url: "/shipments",
    permission: "SHIPMENT_LIST",
    icon: "shipments",
  },
  {
    title: "Track Shipment",
    url: "/shipments/tracking",
    permission: "SHIPMENT_TRACKING_VIEW",
    icon: "shipments",
  },
  {
    title: "Returns",
    url: "/returns",
    permission: "RETURN_LIST",
    icon: "returns",
  },
  {
    title: "View Logs",
    url: "/audit-logs",
    permission: "AUDIT_LOG_VIEW",
    icon: "logs",
  },
  {
    title: "Export Logs",
    url: "/audit-logs/export",
    permission: "AUDIT_LOG_EXPORT",
    icon: "logs",
  },
  {
    title: "Logout",
    url: "/logout",
    icon: "logout",
    permission: "AUTH_LOGGED_IN",
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Warehouse Pro</span>
                  <span className="">v0.0.1</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {mainNav.map((item) => (
              <PermissionGuard required={[item.permission]} key={item.title}>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center"></div>
                        <span>{item.title}</span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </PermissionGuard>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
