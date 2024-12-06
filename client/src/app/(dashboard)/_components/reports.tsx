"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ReportsProps {
  selectedWarehouseIds: string[];
}

const reportTypes = [
  { id: "inventory", name: "Inventory Report" },
  { id: "sales", name: "Sales Report" },
  { id: "orders", name: "Order Report" },
];

const inventoryData = [
  {
    id: 1,
    name: "Product A",
    quantity: 100,
    reorderPoint: 20,
    lastRestocked: "2023-05-15",
  },
  {
    id: 2,
    name: "Product B",
    quantity: 75,
    reorderPoint: 15,
    lastRestocked: "2023-05-10",
  },
  {
    id: 3,
    name: "Product C",
    quantity: 200,
    reorderPoint: 50,
    lastRestocked: "2023-05-20",
  },
  {
    id: 4,
    name: "Product D",
    quantity: 50,
    reorderPoint: 10,
    lastRestocked: "2023-05-18",
  },
  {
    id: 5,
    name: "Product E",
    quantity: 150,
    reorderPoint: 30,
    lastRestocked: "2023-05-12",
  },
];

const salesData = [
  {
    id: 1,
    name: "Product A",
    unitsSold: 50,
    revenue: 2500,
    date: "2023-05-01",
  },
  { id: 2, name: "Product B", unitsSold: 30, revenue: 900, date: "2023-05-02" },
  {
    id: 3,
    name: "Product C",
    unitsSold: 75,
    revenue: 1500,
    date: "2023-05-03",
  },
  {
    id: 4,
    name: "Product D",
    unitsSold: 25,
    revenue: 2500,
    date: "2023-05-04",
  },
  {
    id: 5,
    name: "Product E",
    unitsSold: 60,
    revenue: 2400,
    date: "2023-05-05",
  },
];

const orderData = [
  {
    id: 1,
    orderNumber: "ORD-001",
    customer: "John Doe",
    total: 150,
    status: "Shipped",
  },
  {
    id: 2,
    orderNumber: "ORD-002",
    customer: "Jane Smith",
    total: 200,
    status: "Processing",
  },
  {
    id: 3,
    orderNumber: "ORD-003",
    customer: "Bob Johnson",
    total: 100,
    status: "Delivered",
  },
  {
    id: 4,
    orderNumber: "ORD-004",
    customer: "Alice Brown",
    total: 300,
    status: "Pending",
  },
  {
    id: 5,
    orderNumber: "ORD-005",
    customer: "Charlie Davis",
    total: 175,
    status: "Shipped",
  },
];

const salesTrendData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4500 },
  { month: "May", sales: 6000 },
  { month: "Jun", sales: 5500 },
];

const topSellingProducts = [
  { name: "Product A", sales: 1200 },
  { name: "Product B", sales: 900 },
  { name: "Product C", sales: 800 },
  { name: "Product D", sales: 700 },
  { name: "Product E", sales: 600 },
];

export function Reports({ selectedWarehouseIds }: ReportsProps) {
  const [selectedReport, setSelectedReport] = useState(reportTypes[0].id);

  const handleGenerateReport = () => {
    // In a real application, this would trigger the report generation
    console.log(
      `Generating ${selectedReport} report for warehouses:`,
      selectedWarehouseIds,
    );
  };

  const renderReportTable = () => {
    switch (selectedReport) {
      case "inventory":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Reorder Point</TableHead>
                <TableHead>Last Restocked</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.reorderPoint}</TableCell>
                  <TableCell>{item.lastRestocked}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case "sales":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Units Sold</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.unitsSold}</TableCell>
                  <TableCell>${item.revenue.toFixed(2)}</TableCell>
                  <TableCell>{item.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case "orders":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order Number</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.orderNumber}</TableCell>
                  <TableCell>{item.customer}</TableCell>
                  <TableCell>${item.total.toFixed(2)}</TableCell>
                  <TableCell>{item.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Generate Report</CardTitle>
          <CardDescription>
            Select a report type and click generate
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <Select value={selectedReport} onValueChange={setSelectedReport}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              {reportTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleGenerateReport}>Generate Report</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Report Preview</CardTitle>
          <CardDescription>Sample data for the selected report</CardDescription>
        </CardHeader>
        <CardContent>{renderReportTable()}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Sales Trend</CardTitle>
          <CardDescription>Monthly sales overview</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer
            config={{
              sales: { label: "Sales", color: "hsl(var(--chart-1))" },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="var(--color-sales)"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
          <CardDescription>Products with highest sales</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer
            config={{
              sales: { label: "Sales", color: "hsl(var(--chart-2))" },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topSellingProducts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="sales" fill="var(--color-sales)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
