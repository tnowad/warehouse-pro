import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { useQuery } from "react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function WarehouseDropdown({
  onChange,
}: {
  onChange: (ids: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selectedWarehouseIds, setSelectedWarehouseIds] = useState<string[]>(
    [],
  );
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: warehouses = [],
    isLoading,
    isError,
  } = useQuery(
    ["warehouses"],
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return [
        { id: "1", name: "Warehouse 1" },
        { id: "2", name: "Warehouse 2" },
        { id: "3", name: "Warehouse 3" },
        { id: "4", name: "Warehouse 4" },
        { id: "5", name: "Warehouse 5" },
      ];
    },
    {
      enabled: open,
    },
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const filteredWarehouses = warehouses.filter((warehouse) =>
    warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleWarehouseSelection = (id: string) => {
    setSelectedWarehouseIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((warehouseId) => warehouseId !== id);
      } else {
        return [...prev, id];
      }
    });
    onChange(selectedWarehouseIds);
  };

  const toggleSelectAll = () => {
    if (selectedWarehouseIds.length === warehouses.length) {
      setSelectedWarehouseIds([]);
    } else {
      setSelectedWarehouseIds(warehouses.map((warehouse) => warehouse.id));
    }
    onChange(
      selectedWarehouseIds.length === warehouses.length
        ? []
        : warehouses.map((warehouse) => warehouse.id),
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Warehouse</CardTitle>
      </CardHeader>

      <CardContent>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {selectedWarehouseIds.length === 0
                ? "Select warehouse..."
                : selectedWarehouseIds.length === warehouses.length
                  ? "All warehouses"
                  : selectedWarehouseIds.length === 1
                    ? warehouses.find(
                        (warehouse) => warehouse.id === selectedWarehouseIds[0],
                      )?.name
                    : `${selectedWarehouseIds.length} warehouses selected`}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command className="overflow-hidden">
              <CommandInput
                placeholder="Search warehouse..."
                onValueChange={handleSearchChange}
              />
              <CommandList className="overflow-y-auto max-h-[300px]">
                {isLoading && (
                  <CommandEmpty>Loading warehouses...</CommandEmpty>
                )}
                {isError && (
                  <CommandEmpty>Error loading warehouses.</CommandEmpty>
                )}
                {filteredWarehouses.length === 0 && !isLoading && !isError && (
                  <CommandEmpty>No warehouse found.</CommandEmpty>
                )}
                <CommandGroup>
                  <CommandItem onSelect={toggleSelectAll}>
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedWarehouseIds.length === warehouses.length
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    Select All
                  </CommandItem>
                  {filteredWarehouses.map((warehouse) => (
                    <CommandItem
                      key={warehouse.id}
                      value={warehouse.id}
                      onSelect={() => {
                        toggleWarehouseSelection(warehouse.id);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedWarehouseIds.includes(warehouse.id)
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {warehouse.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  );
}
