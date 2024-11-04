"use client";

import { useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import {} from "@/hooks/queries/list-warehouse-permissions.query";
import { listPermissionsQueryFilterSchema } from "@/lib/apis/list-permissions.api";

export function PlainPermissionList() {
  const [columnFilters, setColumnFilters] = useState({});
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const { data, error, status } = useQuery(
    createGet({
      query: globalFilter,
      ...(listPermissionsQueryFilterSchema.safeParse(
        Object.fromEntries(Object.entries(columnFilters)),
      ).data ?? {}),
    }),
  );

  const permissions = data?.items ?? [];

  return (
    <div>
      <div className="flex items-center py-4 gap-2">
        <Input
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          placeholder="Search permissions..."
          className="max-w-sm"
        />
        <Button
          variant="outline"
          className="ml-auto"
          size={"sm"}
          onClick={() => {
            setGlobalFilter("");
            setColumnFilters({});
          }}
        >
          Clear Filter
        </Button>
      </div>
      <div className="space-y-4">
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
              <div className="flex items-center gap-4">
                <Checkbox
                  checked={permission.enable}
                  onCheckedChange={(value) =>
                    setColumnFilters({ ...columnFilters, enable: value })
                  }
                  aria-label="Enable permission"
                />
                <div>
                  <h3 className="font-semibold">{permission.name}</h3>
                  <p className="text-sm text-gray-600">
                    {permission.description}
                  </p>
                </div>
              </div>
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
