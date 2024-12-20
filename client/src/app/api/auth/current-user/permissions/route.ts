import { NextRequest } from "next/server";
import { GetCurrentUserPermissionsResponseSchema } from "@/lib/apis/get-current-user-permissions.api";

export async function GET(request: NextRequest) {
  return Response.json({
    permissions: [
      // General
      "DASHBOARD_VIEW",
      "SETTINGS_VIEW",

      // User Management
      "USER_ROLE_ASSIGN",
      "USER_DELETE",
      "USER_LOGIN",
      "USER_REGISTER",
      "USER_DETAILS_VIEW",
      "USER_ROLES_VIEW",
      "USER_UPDATE",
      "USER_CURRENT_PERMISSIONS_VIEW",
      "USER_CURRENT_ROLES_VIEW",

      // Role & Permission Management
      "ROLE_PERMISSION_ASSIGN",
      "PERMISSION_CREATE",
      "PERMISSION_DELETE",
      "PERMISSION_VIEW",
      "PERMISSION_UPDATE",
      "ROLE_CREATE",
      "ROLE_DELETE",
      "ROLE_VIEW",
      "ROLE_UPDATE",

      // Order Management
      "ORDER_CREATE",
      "ORDER_CANCEL",
      "ORDER_DETAILS_VIEW",
      "ORDER_ITEMS_VIEW",
      "ORDER_LIST_VIEW",
      "ORDER_UPDATE",

      // Procurement Management
      "PROCUREMENT_CREATE",
      "PROCUREMENT_ITEM_CREATE",
      "PROCUREMENT_DETAILS_VIEW",
      "PROCUREMENT_LIST_VIEW",
      "PROCUREMENT_STATUS_UPDATE",

      // Product & Inventory Management
      "PRODUCT_CREATE",
      "PRODUCT_DELETE",
      "PRODUCT_DETAILS_VIEW",
      "PRODUCT_LIST_VIEW",
      "PRODUCT_UPDATE",
      "INVENTORY_STATUS_VIEW",
      "INVENTORY_UPDATE",
      "PRODUCT_REORDER",

      // Shipment Management
      "SHIPMENT_CREATE",
      "SHIPMENT_DETAILS_VIEW",
      "SHIPMENT_ITEMS_VIEW",
      "SHIPMENT_LIST_VIEW",
      "SHIPMENT_STATUS_UPDATE",
      "SHIPMENT_TRACK",

      // Return Management
      "RETURN_CREATE",
      "RETURN_DETAILS_VIEW",
      "RETURN_LIST_VIEW",
      "RETURN_STATUS_UPDATE",

      // Supplier Management
      "SUPPLIER_CREATE",
      "SUPPLIER_DELETE",
      "SUPPLIER_DETAILS_VIEW",
      "SUPPLIER_LIST_VIEW",
      "SUPPLIER_UPDATE",

      // Warehouse Management
      "WAREHOUSE_CREATE",
      "WAREHOUSE_DELETE",
      "WAREHOUSE_DETAILS_VIEW",
      "WAREHOUSE_LIST_VIEW",
      "WAREHOUSE_UPDATE",

      // Audit Logging
      "AUDIT_LOG_ENTRY_CREATE",
      "AUDIT_LOG_DETAILS_VIEW",
      "AUDIT_LOG_LIST_VIEW",
    ],
  } satisfies GetCurrentUserPermissionsResponseSchema);
}
