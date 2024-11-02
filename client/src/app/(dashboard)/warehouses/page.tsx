"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { WarehouseTable } from "@/app/_components/warehouse-table";

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Warehouses</h2>
        <Link href="/warehouses/new">
          <Button>Create Warehouse</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <WarehouseTable />
      </CardContent>
    </Card>
  );
}
