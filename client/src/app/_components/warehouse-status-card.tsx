"use client";
import { useQuery } from "react-query";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import {
  getWarehouseStatus,
  getWarehouseStatusCount,
} from "@/server/actions/warehouse";
import { useRouter } from "next/navigation";
import { Cell, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  count: {
    label: "Count",
  },
  active: {
    label: "Active",
    color: "hsl(var(--chart-1))",
  },
  inactive: {
    label: "Inactive",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function WarehouseStatusChart() {
  const getWarehouseStatusCountQuery = useQuery(["warehouses-count"], () => {
    return getWarehouseStatusCount();
  });

  return (
    <Card className="flex flex-col mb-2">
      <CardHeader className="items-center pb-0">
        <CardTitle>Warehouse Status Pie Chart</CardTitle>
        <CardDescription>Current Status Overview</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={getWarehouseStatusCountQuery.data ?? []}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
            >
              <Cell fill={chartConfig.active.color} key="active" />
              <Cell fill={chartConfig.inactive.color} key="inactive" />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function WarehouseStatusCard() {
  const getWarehouseStatusQuery = useQuery(["warehouses"], () => {
    return getWarehouseStatus();
  });
  const router = useRouter();

  const columns: ColumnDef<{ id: number; name: string; status: string }>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell(props) {
        return (
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => {
              router.push(`/warehouses/${props.row.original.id}`);
            }}
          >
            <Eye />
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <WarehouseStatusChart />
      <DataTable
        columns={columns}
        data={getWarehouseStatusQuery.data?.items ?? []}
      />
    </div>
  );
}
