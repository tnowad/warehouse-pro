import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FilterIcon } from "lucide-react";
import { DebouncedInput } from "./debounced-input";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 data-[state=open]:bg-accent w-full justify-between"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <CaretSortIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={() =>
              column.toggleSorting(false, column.getCanMultiSort())
            }
          >
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => column.toggleSorting(true, column.getCanMultiSort())}
          >
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {column.getCanFilter() ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm">
              <FilterIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            {filterVariant === "range" ? (
              <div>
                <div className="flex space-x-2">
                  <DebouncedInput
                    type="number"
                    value={(columnFilterValue as [number, number])?.[0] ?? ""}
                    onChange={(value) =>
                      column.setFilterValue((old: [number, number]) => [
                        value,
                        old?.[1],
                      ])
                    }
                    placeholder={`Min`}
                    className="w-24 border shadow rounded"
                  />
                  <DebouncedInput
                    type="number"
                    value={(columnFilterValue as [number, number])?.[1] ?? ""}
                    onChange={(value) =>
                      column.setFilterValue((old: [number, number]) => [
                        old?.[0],
                        value,
                      ])
                    }
                    placeholder={`Max`}
                    className="w-24 border shadow rounded"
                  />
                </div>
                <div className="h-1" />
              </div>
            ) : filterVariant === "select" ? (
              <select
                onChange={(e) => column.setFilterValue(e.target.value)}
                value={columnFilterValue?.toString()}
              >
                {/* See faceted column filters example for dynamic select options */}
                <option value="">All</option>
                <option value="complicated">complicated</option>
                <option value="relationship">relationship</option>
                <option value="single">single</option>
              </select>
            ) : (
              <DebouncedInput
                onChange={(value) => column.setFilterValue(value)}
                placeholder={`Search...`}
                type="text"
                value={(columnFilterValue ?? "") as string}
              />
            )}
          </PopoverContent>
        </Popover>
      ) : null}
    </div>
  );
}
