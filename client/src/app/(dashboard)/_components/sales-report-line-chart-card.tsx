"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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
import { useQuery } from "@tanstack/react-query";
import { createGetSalesReportQueryOptions } from "@/hooks/queries/get-sales-report.query";

export function SalesReportLineChartCard() {
  const getSalesReportQuery = useQuery(createGetSalesReportQueryOptions({}));

  const totalSales = React.useMemo(
    () =>
      getSalesReportQuery.data?.items.reduce(
        (acc, { totalSales }) => acc + totalSales,
        0,
      ) ?? 0,
    [getSalesReportQuery.data?.items],
  );

  const chartData = React.useMemo(
    () => getSalesReportQuery.data?.items ?? [],
    [getSalesReportQuery.data?.items],
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Sales Report - Interactive</CardTitle>
          <CardDescription>
            Showing total sales for the last 3 months:{" "}
            <strong>{totalSales.toLocaleString()}</strong>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={{
            totalSales: {
              label: "Total Sales",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="totalSales"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey="totalSales"
              type="monotone"
              stroke="var(--color-totalSales)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
