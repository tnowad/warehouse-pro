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
import { DateRangePicker } from "@/components/ui/date-range-picker";

interface SummaryReport {
  report_date: string;
  total_inventory: number;
  total_orders: number;
  total_shipped: number;
  total_sales: number;
  total_customers: number;
  total_products: number;
}

interface InventoryReport {
  report_date: string;
  warehouse_id: string;
  warehouse_name: string;
  product_id: string;
  product_name: string;
  quantity: number;
  last_updated: string;
  status: string;
}

interface OrderReport {
  report_date: string;
  order_id: string;
  order_status: string;
  total_amount: number;
  payment_status: string;
  created_at: string;
  shipment_id: string;
  shipment_status: string;
  tracking_number: string;
}

interface SalesReport {
  report_date: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity_sold: number;
  price_per_unit: number;
  total_price: number;
  discount: number;
}

interface InventoryCreationReport {
  report_date: string;
  warehouse_id: string;
  warehouse_name: string;
  product_id: string;
  product_name: string;
  quantity: number;
  status: string;
}

interface SalesCreationReport {
  report_date: string;
  order_id: string;
  total_amount: number;
  product_id: string;
  product_name: string;
  quantity_sold: number;
  price_per_unit: number;
  total_price: number;
  discount: number;
}

interface ReportsProps {}

const reportTypes = [
  { id: "summary", name: "Summary Report" },
  { id: "inventory", name: "Inventory Report" },
  { id: "order", name: "Order Report" },
  { id: "sales", name: "Sales Report" },
  { id: "inventoryCreation", name: "Inventory Creation Report" },
  { id: "salesCreation", name: "Sales Creation Report" },
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

export function Reports() {
  const [selectedReport, setSelectedReport] = useState(reportTypes[0].id);
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date(),
  });

  const handleGenerateReport = () => {
    console.log("Generating report...");
  };
  const renderReportTable = () => {
    switch (selectedReport) {
      case "summary":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Date</TableHead>
                <TableHead>Total Inventory</TableHead>
                <TableHead>Total Orders</TableHead>
                <TableHead>Total Shipped</TableHead>
                <TableHead>Total Sales</TableHead>
                <TableHead>Total Customers</TableHead>
                <TableHead>Total Products</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{/* Add sample data for summary report */}</TableBody>
          </Table>
        );
      case "inventory":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Date</TableHead>
                <TableHead>Warehouse</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{/* Add sample data for inventory report */}</TableBody>
          </Table>
        );
      case "order":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Date</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Shipment Status</TableHead>
                <TableHead>Tracking Number</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{/* Add sample data for order report */}</TableBody>
          </Table>
        );
      case "sales":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Date</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Quantity Sold</TableHead>
                <TableHead>Price Per Unit</TableHead>
                <TableHead>Total Price</TableHead>
                <TableHead>Discount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{/* Add sample data for sales report */}</TableBody>
          </Table>
        );
      case "inventoryCreation":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Date</TableHead>
                <TableHead>Warehouse</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Add sample data for inventory creation report */}
            </TableBody>
          </Table>
        );
      case "salesCreation":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Date</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Quantity Sold</TableHead>
                <TableHead>Price Per Unit</TableHead>
                <TableHead>Total Price</TableHead>
                <TableHead>Discount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Add sample data for sales creation report */}
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
            Select a report type, date range, and click generate
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
          <DateRangePicker value={dateRange} onValueChange={setDateRange} />
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
    </div>
  );
}
