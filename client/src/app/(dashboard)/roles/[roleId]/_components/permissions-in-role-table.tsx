"use client";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/dist/client/link";
import { createListRolePermissionsQuery } from "@/hooks/queries/list-role-permissions.query";
import { Switch } from "@/components/ui/switch";

type PermissionsInRoleTableProps = {
  roleId: string;
};
export function PermissionsInRoleTable({
  roleId,
}: PermissionsInRoleTableProps) {
  const { data, error, status } = useQuery(
    createListRolePermissionsQuery({ id: roleId }),
  );

  const permissions = data?.items ?? [];

  return (
    <div>
      <div className="grid xl:grid-cols-2 gap-2">
        {status === "pending" ? (
          <div>Loading...</div>
        ) : status === "error" ? (
          <div>{error?.message}</div>
        ) : permissions.length ? (
          permissions.map((permission) => (
            <div
              key={permission.name}
              className="flex items-center justify-between p-2 border rounded-md"
            >
              <Switch checked={permission.enable} />
              <div>{permission.name}</div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size={"icon"} variant={"ghost"}>
                    <EllipsisIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() =>
                      navigator.clipboard.writeText(permission.name)
                    }
                  >
                    Copy Permission Name
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/permissions/${permission.name}`}>
                      View details
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/permissions/${permission.name}/edit`}>
                      Edit information
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))
        ) : (
          <div>No results.</div>
        )}
      </div>
    </div>
  );
}
