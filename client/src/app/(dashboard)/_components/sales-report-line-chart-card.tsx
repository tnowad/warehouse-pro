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

const chartData = [
  { date: "2024-04-01", totalSales: 372 },
  { date: "2024-04-02", totalSales: 277 },
  { date: "2024-04-03", totalSales: 287 },
  { date: "2024-04-04", totalSales: 502 },
  { date: "2024-04-05", totalSales: 663 },
  { date: "2024-04-06", totalSales: 641 },
  { date: "2024-04-07", totalSales: 425 },
  { date: "2024-04-08", totalSales: 729 },
  { date: "2024-04-09", totalSales: 169 },
  { date: "2024-04-10", totalSales: 451 },
  { date: "2024-04-11", totalSales: 677 },
  { date: "2024-04-12", totalSales: 502 },
  { date: "2024-04-13", totalSales: 722 },
  { date: "2024-04-14", totalSales: 357 },
  { date: "2024-04-15", totalSales: 290 },
  { date: "2024-04-16", totalSales: 328 },
  { date: "2024-04-17", totalSales: 806 },
  { date: "2024-04-18", totalSales: 774 },
  { date: "2024-04-19", totalSales: 423 },
  { date: "2024-04-20", totalSales: 239 },
  { date: "2024-04-21", totalSales: 337 },
  { date: "2024-04-22", totalSales: 394 },
  { date: "2024-04-23", totalSales: 368 },
  { date: "2024-04-24", totalSales: 677 },
  { date: "2024-04-25", totalSales: 465 },
  { date: "2024-04-26", totalSales: 205 },
  { date: "2024-04-27", totalSales: 803 },
  { date: "2024-04-28", totalSales: 302 },
  { date: "2024-04-29", totalSales: 555 },
  { date: "2024-04-30", totalSales: 834 },
];

export function SalesReportLineChartCard() {
  const totalSales = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.totalSales, 0),
    [],
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
