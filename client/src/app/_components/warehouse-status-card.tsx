import { useQuery } from "react-query";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { getWarehouseStatus } from "@/server/actions/warehouse";
import { useRouter } from "next/navigation";

export function WarehouseStatusCard() {
  const { data: warehouses, isLoading } = useQuery(["warehouses"], () => {
    return getWarehouseStatus();
  });

  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
      <DataTable columns={columns} data={warehouses ?? []} />
    </div>
  );
}
