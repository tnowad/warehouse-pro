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
import { useSuspenseQuery } from "@tanstack/react-query";
import { getCurrentUserPermissionsQueryOptions } from "@/hooks/queries/get-current-user-permissions.query";
import { PermissionGuard } from "@/app/_components/permission-guard";
import { Fragment } from "react";

const mainNav = [
  {
    title: "Dashboard",
    url: "/dashboard",
    permission: "DASHBOARD_VIEW",
    icon: "dashboard",
  },
  {
    title: "Warehouses",
    url: "/warehouses",
    permission: "WAREHOUSE_LIST_VIEW",
    icon: "warehouse",
    items: [
      {
        title: "Warehouses",
        url: "/warehouses",
        permission: "WAREHOUSE_LIST_VIEW",
      },
      {
        title: "Add Warehouse",
        url: "/warehouses/add",
        permission: "WAREHOUSE_CREATE",
      },
      {
        title: "Overview",
        url: "/warehouses/overview",
        permission: "WAREHOUSE_DETAILS_VIEW",
      },
    ],
  },
  {
    title: "Users",
    url: "/users",
    permission: "USER_DETAILS_VIEW",
    icon: "users",
    items: [
      { title: "Users", url: "/users", permission: "USER_DETAILS_VIEW" },
      { title: "Roles", url: "/users/roles", permission: "ROLE_VIEW" },
      {
        title: "Permissions",
        url: "/users/permissions",
        permission: "PERMISSION_VIEW",
      },
    ],
  },
  {
    title: "Orders",
    url: "/orders",
    permission: "ORDER_LIST_VIEW",
    icon: "orders",
    items: [
      { title: "Orders", url: "/orders", permission: "ORDER_LIST_VIEW" },
      {
        title: "Pending Orders",
        url: "/orders/pending",
        permission: "ORDER_DETAILS_VIEW",
      },
      {
        title: "Completed Orders",
        url: "/orders/completed",
        permission: "ORDER_DETAILS_VIEW",
      },
    ],
  },
  {
    title: "Products",
    url: "/products",
    permission: "PRODUCT_LIST_VIEW",
    icon: "products",
    items: [
      {
        title: "Products",
        url: "/products",
        permission: "PRODUCT_LIST_VIEW",
      },
      {
        title: "Add Product",
        url: "/products/add",
        permission: "PRODUCT_CREATE",
      },
      {
        title: "Categories",
        url: "/products/categories",
        permission: "PRODUCT_DETAILS_VIEW",
      },
    ],
  },
  {
    title: "Inventory",
    url: "/inventory",
    permission: "INVENTORY_STATUS_VIEW",
    icon: "inventory",
    items: [
      {
        title: "Stock Levels",
        url: "/inventory/stock-levels",
        permission: "INVENTORY_STATUS_VIEW",
      },
      {
        title: "Reorder List",
        url: "/inventory/reorder-list",
        permission: "PRODUCT_REORDER",
      },
      {
        title: "Inventory Reports",
        url: "/inventory/reports",
        permission: "INVENTORY_STATUS_VIEW",
      },
    ],
  },
  {
    title: "Shipments",
    url: "/shipments",
    permission: "SHIPMENT_LIST_VIEW",
    icon: "shipments",
    items: [
      {
        title: "Shipments",
        url: "/shipments",
        permission: "SHIPMENT_LIST_VIEW",
      },
      {
        title: "Tracking",
        url: "/shipments/tracking",
        permission: "SHIPMENT_TRACK",
      },
      {
        title: "Pending Shipments",
        url: "/shipments/pending",
        permission: "SHIPMENT_DETAILS_VIEW",
      },
    ],
  },
  {
    title: "Procurement",
    url: "/procurement",
    permission: "PROCUREMENT_LIST_VIEW",
    icon: "procurement",
    items: [
      {
        title: "Purchase Orders",
        url: "/procurement/purchase-orders",
        permission: "PROCUREMENT_CREATE",
      },
      {
        title: "Suppliers",
        url: "/procurement/suppliers",
        permission: "SUPPLIER_LIST_VIEW",
      },
      {
        title: "Contracts",
        url: "/procurement/contracts",
        permission: "SUPPLIER_DETAILS_VIEW",
      },
    ],
  },
  {
    title: "Reports",
    url: "/reports",
    permission: "DASHBOARD_VIEW",
    icon: "reports",
    items: [
      {
        title: "Sales Reports",
        url: "/reports/sales",
        permission: "DASHBOARD_VIEW",
      },
      {
        title: "Inventory Reports",
        url: "/reports/inventory",
        permission: "INVENTORY_STATUS_VIEW",
      },
      {
        title: "User Activity",
        url: "/reports/user-activity",
        permission: "USER_DETAILS_VIEW",
      },
    ],
  },
  {
    title: "Settings",
    url: "/settings",
    permission: "SETTINGS_VIEW",
    icon: "settings",
    items: [
      {
        title: "User Management",
        url: "/settings/user-management",
        permission: "USER_DETAILS_VIEW",
      },
      {
        title: "Roles & Permissions",
        url: "/settings/roles-permissions",
        permission: "ROLE_VIEW",
      },
      {
        title: "Preferences",
        url: "/settings/preferences",
        permission: "SETTINGS_VIEW",
      },
    ],
  },
];

export function AppSidebar() {
  const { data, isError } = useSuspenseQuery(
    getCurrentUserPermissionsQueryOptions,
  );

  return (
    <>
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
                      permissions={data.permissions}
                      requiredPermissions={item.items.map(
                        (item) => item.permission,
                      )}
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
                                  permissions={data.permissions}
                                  requiredPermissions={item.permission}
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
    </>
  );
}
