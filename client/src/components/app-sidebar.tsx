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
    permission: "VIEW_DASHBOARD",
    items: [
      {
        title: "Home",
        url: "/",
        permission: "VIEW_DASHBOARD",
      },
      {
        title: "Settings",
        url: "/settings",
        permission: "VIEW_SETTINGS",
      },
    ],
  },
  {
    title: "Users",
    permission: "VIEW_USER_DETAILS",
    items: [
      {
        title: "View Users",
        url: "/users/view",
        permission: "VIEW_USER_DETAILS",
      },
      {
        title: "Login",
        url: "/users/login",
        permission: "LOGIN",
      },
      {
        title: "Register",
        url: "/users/register",
        permission: "REGISTER",
      },
      {
        title: "My Permissions",
        url: "/users/current-permissions",
        permission: "VIEW_CURRENT_USER_PERMISSIONS",
      },
      {
        title: "My Roles",
        url: "/users/current-roles",
        permission: "VIEW_CURRENT_USER_ROLES",
      },
    ],
  },
  {
    title: "Roles & Permissions",
    permission: "VIEW_ROLES",
    items: [
      {
        title: "Create Role",
        url: "/roles/create",
        permission: "CREATE_ROLE",
      },
      {
        title: "View Roles",
        url: "/roles/view",
        permission: "VIEW_ROLES",
      },
      {
        title: "Create Permission",
        url: "/permissions/create",
        permission: "CREATE_PERMISSION",
      },
      {
        title: "View Permissions",
        url: "/permissions/view",
        permission: "VIEW_PERMISSIONS",
      },
    ],
  },
  {
    title: "Orders",
    permission: "LIST_ORDERS",
    items: [
      {
        title: "Create Order",
        url: "/orders/create",
        permission: "CREATE_ORDER",
      },
      {
        title: "List Orders",
        url: "/orders/list",
        permission: "LIST_ORDERS",
      },
    ],
  },
  {
    title: "Procurement",
    permission: "LIST_PROCUREMENTS",
    items: [
      {
        title: "Create Procurement",
        url: "/procurements/create",
        permission: "CREATE_PROCUREMENT",
      },
      {
        title: "List Procurements",
        url: "/procurements/list",
        permission: "LIST_PROCUREMENTS",
      },
    ],
  },
  {
    title: "Products",
    permission: "LIST_PRODUCTS",
    items: [
      {
        title: "Create Product",
        url: "/products/create",
        permission: "CREATE_PRODUCT",
      },
      {
        title: "List Products",
        url: "/products/list",
        permission: "LIST_PRODUCTS",
      },
      {
        title: "Inventory Status",
        url: "/inventory/status",
        permission: "VIEW_INVENTORY_STATUS",
      },
    ],
  },
  {
    title: "Shipments",
    permission: "LIST_SHIPMENTS",
    items: [
      {
        title: "Create Shipment",
        url: "/shipments/create",
        permission: "CREATE_SHIPMENT",
      },
      {
        title: "List Shipments",
        url: "/shipments/list",
        permission: "LIST_SHIPMENTS",
      },
    ],
  },
  {
    title: "Returns",
    permission: "LIST_RETURNS",
    items: [
      {
        title: "Create Return",
        url: "/returns/create",
        permission: "CREATE_RETURN",
      },
      {
        title: "List Returns",
        url: "/returns/list",
        permission: "LIST_RETURNS",
      },
    ],
  },
  {
    title: "Suppliers",
    permission: "LIST_SUPPLIERS",
    items: [
      {
        title: "Create Supplier",
        url: "/suppliers/create",
        permission: "CREATE_SUPPLIER",
      },
      {
        title: "List Suppliers",
        url: "/suppliers/list",
        permission: "LIST_SUPPLIERS",
      },
    ],
  },
  {
    title: "Warehouses",
    permission: "LIST_WAREHOUSES",
    items: [
      {
        title: "Create Warehouse",
        url: "/warehouses/create",
        permission: "CREATE_WAREHOUSE",
      },
      {
        title: "List Warehouses",
        url: "/warehouses/list",
        permission: "LIST_WAREHOUSES",
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
                          <PermissionGuard
                            permissions={data.permissions}
                            requiredPermissions={item.permission}
                          >
                            <CollapsibleContent>
                              <SidebarMenuSub>
                                {item.items.map((item) => (
                                  <SidebarMenuSubItem key={item.title}>
                                    <SidebarMenuSubButton
                                      asChild
                                      isActive={false}
                                    >
                                      <Link href={item.url}>{item.title}</Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                ))}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </PermissionGuard>
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
