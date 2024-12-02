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
  items?: {
    title: string;
    url: string;
    permission: PermissionName;
  }[];
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
    items: [
      {
        title: "Users",
        url: "/users",
        permission: "USER_LIST",
      },
      {
        title: "Create User",
        url: "/users/new",
        permission: "USER_CREATE",
      },
    ],
  },
  {
    title: "Roles & Permissions",
    url: "/roles",
    permission: "ROLE_LIST",
    icon: "roles",
    items: [
      {
        title: "Roles",
        url: "/roles",
        permission: "ROLE_LIST",
      },
      {
        title: "Create Role",
        url: "/roles/new",
        permission: "ROLE_CREATE",
      },
    ],
  },
  {
    title: "Warehouses",
    url: "/warehouses",
    permission: "WAREHOUSE_LIST",
    icon: "warehouse",
    items: [
      {
        title: "Warehouses",
        url: "/warehouses",
        permission: "WAREHOUSE_LIST",
      },
      {
        title: "Create Warehouse",
        url: "/warehouses/new",
        permission: "WAREHOUSE_CREATE",
      },
    ],
  },
  {
    title: "Inventory",
    url: "/inventory",
    permission: "INVENTORY_PRODUCT_LIST",
    icon: "inventory",
    items: [
      {
        title: "Inventory Overview",
        url: "/inventory",
        permission: "INVENTORY_PRODUCT_LIST",
      },
      {
        title: "Create Product",
        url: "/inventory/new",
        permission: "INVENTORY_PRODUCT_CREATE",
      },
      {
        title: "Low Stock Alerts",
        url: "/inventory/alerts",
        permission: "INVENTORY_LOW_STOCK_ALERT",
      },
    ],
  },
  {
    title: "Orders",
    url: "/orders",
    permission: "ORDER_LIST",
    icon: "orders",
    items: [
      {
        title: "Orders",
        url: "/orders",
        permission: "ORDER_LIST",
      },
      {
        title: "Create Order",
        url: "/orders/new",
        permission: "ORDER_CREATE",
      },
      {
        title: "Track Orders",
        url: "/orders/status",
        permission: "ORDER_STATUS_TRACK",
      },
      {
        title: "Assign Shipment",
        url: "/orders/assign-shipment",
        permission: "ORDER_ASSIGN_SHIPMENT",
      },
    ],
  },
  {
    title: "Procurement",
    url: "/procurement",
    permission: "PROCUREMENT_ORDER_LIST",
    icon: "procurement",
    items: [
      {
        title: "Suppliers",
        url: "/suppliers",
        permission: "PROCUREMENT_SUPPLIER_LIST",
      },
      {
        title: "Create Supplier",
        url: "/suppliers/new",
        permission: "PROCUREMENT_SUPPLIER_CREATE",
      },
      {
        title: "Purchase Orders",
        url: "/purchase-orders",
        permission: "PROCUREMENT_ORDER_LIST",
      },
      {
        title: "Create Purchase Order",
        url: "/purchase-orders/new",
        permission: "PROCUREMENT_ORDER_CREATE",
      },
    ],
  },
  {
    title: "Shipments",
    url: "/shipments",
    permission: "SHIPMENT_LIST",
    icon: "shipments",
    items: [
      {
        title: "Shipments",
        url: "/shipments",
        permission: "SHIPMENT_LIST",
      },
      {
        title: "Create Shipment",
        url: "/shipments/new",
        permission: "SHIPMENT_CREATE",
      },
      {
        title: "Track Shipment",
        url: "/shipments/tracking",
        permission: "SHIPMENT_TRACKING_VIEW",
      },
    ],
  },
  {
    title: "Returns",
    url: "/returns",
    permission: "RETURN_LIST",
    icon: "returns",
    items: [
      {
        title: "Returns",
        url: "/returns",
        permission: "RETURN_LIST",
      },
      {
        title: "Create Return",
        url: "/returns/new",
        permission: "RETURN_CREATE",
      },
    ],
  },
  {
    title: "Audit Logs",
    url: "/audit-logs",
    permission: "AUDIT_LOG_VIEW",
    icon: "logs",
    items: [
      {
        title: "View Logs",
        url: "/audit-logs",
        permission: "AUDIT_LOG_VIEW",
      },
      {
        title: "Export Logs",
        url: "/audit-logs/export",
        permission: "AUDIT_LOG_EXPORT",
      },
    ],
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
            {mainNav.map((item, index) => (
              <Fragment key={item.title}>
                {item.items?.length ? (
                  <PermissionGuard
                    required={item.items.map((item) => item.permission)}
                    operator="OR"
                  >
                    <Collapsible
                      defaultOpen={index === 1}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton>
                            {item.title}{" "}
                            <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                            <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((item) => (
                              <PermissionGuard
                                required={[item.permission]}
                                key={item.title}
                              >
                                <SidebarMenuSubItem>
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={false}
                                  >
                                    <Link href={item.url}>{item.title}</Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              </PermissionGuard>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  </PermissionGuard>
                ) : null}
              </Fragment>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
