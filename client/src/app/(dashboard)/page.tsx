"use client";

import { SalesReportLineChartCard } from "./_components/sales-report-line-chart-card";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createGetSummaryReportQueryOptions } from "@/hooks/queries/get-summary-report.query";
import { useQuery } from "@tanstack/react-query";
import { DollarSign, Package, Truck, BarChart2 } from "lucide-react";

export default function DashboardPage() {
  const getSummaryReportQuery = useQuery(createGetSummaryReportQueryOptions());

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Inventory
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getSummaryReportQuery.data?.totalInventory}
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Orders
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getSummaryReportQuery.data?.unshippedOrders}
            </div>
            <p className="text-xs text-muted-foreground">-4% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shipping</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getSummaryReportQuery.data?.percentageOfShippedOrders}%
            </div>
            <p className="text-xs text-muted-foreground">
              +2.5% from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders Placed</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getSummaryReportQuery.data?.totalOrders}
            </div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-full">
          <SalesReportLineChartCard />
        </div>
      </div>
    </div>
  );
}
