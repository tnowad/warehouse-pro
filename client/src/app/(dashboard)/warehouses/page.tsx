"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WarehouseTable } from "@/app/_components/warehouse-table";

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Warehouses
        </CardTitle>
      </CardHeader>
      <CardContent>
        <WarehouseTable />
      </CardContent>
    </Card>
  );
}
