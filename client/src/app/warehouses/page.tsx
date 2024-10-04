"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Component() {
  const [warehouses, setWarehouses] = useState([
    {
      id: 1,
      name: "Main Warehouse",
      address: "123 Main St, Anytown USA",
      capacity: 50000,
      status: "Active",
    },
    {
      id: 2,
      name: "East Coast Warehouse",
      address: "456 Oak Rd, Somewhere City",
      capacity: 30000,
      status: "Active",
    },
    {
      id: 3,
      name: "West Coast Warehouse",
      address: "789 Elm Ave, Another Town",
      capacity: 40000,
      status: "Inactive",
    },
    {
      id: 4,
      name: "Midwest Warehouse",
      address: "321 Pine St, Somewhere Else",
      capacity: 35000,
      status: "Active",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
  });
  const filteredWarehouses = useMemo(() => {
    return warehouses.filter((warehouse) => {
      if (
        searchTerm &&
        !warehouse.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      if (filters.status !== "all" && warehouse.status !== filters.status) {
        return false;
      }
      return true;
    });
  }, [warehouses, searchTerm, filters]);
  const [showModal, setShowModal] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState(null);
  const handleCreateWarehouse = () => {
    setEditingWarehouse(null);
    setShowModal(true);
  };
  const handleEditWarehouse = (warehouse) => {
    setEditingWarehouse(warehouse);
    setShowModal(true);
  };
  const handleDeleteWarehouse = (id) => {
    setWarehouses(warehouses.filter((warehouse) => warehouse.id !== id));
  };
  const handleSaveWarehouse = (warehouse) => {
    if (editingWarehouse) {
      setWarehouses(
        warehouses.map((w) => (w.id === warehouse.id ? warehouse : w)),
      );
    } else {
      setWarehouses([
        ...warehouses,
        { ...warehouse, id: warehouses.length + 1 },
      ]);
    }
    setShowModal(false);
    setEditingWarehouse(null);
  };
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Warehouses</h1>
        <Button onClick={handleCreateWarehouse}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Create Warehouse
        </Button>
      </div>
      <div className="mb-6 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search warehouses..."
            className="w-full rounded-lg bg-background pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <FilterIcon className="w-4 h-4" />
              <span>
                {filters.status === "all"
                  ? "All"
                  : filters.status === "Active"
                    ? "Active"
                    : "Inactive"}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={filters.status === "all"}
              onCheckedChange={() => setFilters({ ...filters, status: "all" })}
            >
              All
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.status === "Active"}
              onCheckedChange={() =>
                setFilters({ ...filters, status: "Active" })
              }
            >
              Active
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.status === "Inactive"}
              onCheckedChange={() =>
                setFilters({ ...filters, status: "Inactive" })
              }
            >
              Inactive
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWarehouses.map((warehouse) => (
              <TableRow key={warehouse.id}>
                <TableCell className="font-medium">{warehouse.name}</TableCell>
                <TableCell>{warehouse.address}</TableCell>
                <TableCell>{warehouse.capacity}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      warehouse.status === "Active" ? "secondary" : "outline"
                    }
                  >
                    {warehouse.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleEditWarehouse(warehouse)}
                  >
                    <FilePenIcon className="w-4 h-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleDeleteWarehouse(warehouse.id)}
                  >
                    <TrashIcon className="w-4 h-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {showModal && (
        <div>
          <div />
        </div>
      )}
    </div>
  );
}

function FilePenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function FilterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
