import { NextRequest } from "next/server";
import { GetCurrentUserPermissionsResponseSchema } from "@/lib/apis/get-current-user-permissions.api";

export async function GET(request: NextRequest) {
  return Response.json({
    permissions: [
      // General
      "VIEW_DASHBOARD",
      "VIEW_SETTINGS",

      // User Management
      "ASSIGN_ROLE",
      "DELETE_USER",
      "LOGIN",
      "REGISTER",
      "VIEW_USER_DETAILS",
      "VIEW_USER_ROLES",
      "UPDATE_USER",
      "VIEW_CURRENT_USER_PERMISSIONS",
      "VIEW_CURRENT_USER_ROLES",

      // Role & Permission Management
      "ASSIGN_PERMISSION_TO_ROLE",
      "CREATE_PERMISSION",
      "DELETE_PERMISSION",
      "VIEW_PERMISSIONS",
      "UPDATE_PERMISSION",
      "CREATE_ROLE",
      "DELETE_ROLE",
      "VIEW_ROLES",
      "UPDATE_ROLE",

      // Order Management
      "CREATE_ORDER",
      "CANCEL_ORDER",
      "VIEW_ORDER_DETAILS",
      "VIEW_ORDER_ITEMS",
      "LIST_ORDERS",
      "UPDATE_ORDER",

      // Procurement Management
      "CREATE_PROCUREMENT",
      "CREATE_PROCUREMENT_ITEM",
      "VIEW_PROCUREMENT_DETAILS",
      "LIST_PROCUREMENTS",
      "UPDATE_PROCUREMENT_STATUS",

      // Product & Inventory Management
      "CREATE_PRODUCT",
      "DELETE_PRODUCT",
      "VIEW_PRODUCT_DETAILS",
      "LIST_PRODUCTS",
      "UPDATE_PRODUCT",
      "VIEW_INVENTORY_STATUS",
      "UPDATE_INVENTORY",
      "REORDER_PRODUCT",

      // Shipment Management
      "CREATE_SHIPMENT",
      "VIEW_SHIPMENT_DETAILS",
      "VIEW_SHIPMENT_ITEMS",
      "LIST_SHIPMENTS",
      "UPDATE_SHIPMENT_STATUS",
      "TRACK_SHIPMENT",

      // Return Management
      "CREATE_RETURN",
      "VIEW_RETURN_DETAILS",
      "LIST_RETURNS",
      "UPDATE_RETURN_STATUS",

      // Supplier Management
      "CREATE_SUPPLIER",
      "DELETE_SUPPLIER",
      "VIEW_SUPPLIER_DETAILS",
      "LIST_SUPPLIERS",
      "UPDATE_SUPPLIER",

      // Warehouse Management
      "CREATE_WAREHOUSE",
      "DELETE_WAREHOUSE",
      "VIEW_WAREHOUSE_DETAILS",
      "LIST_WAREHOUSES",
      "UPDATE_WAREHOUSE",

      // Audit Logging
      "CREATE_AUDIT_LOG_ENTRY",
      "VIEW_AUDIT_LOG_DETAILS",
      "LIST_AUDIT_LOGS",
    ],
  } satisfies GetCurrentUserPermissionsResponseSchema);
}
