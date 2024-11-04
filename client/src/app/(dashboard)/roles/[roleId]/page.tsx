import { PermissionsInRoleTable } from "./_components/permissions-in-role-table";
import { RoleDetails } from "./_components/role-details";
import { RoleWarehousesAssigned } from "./_components/role-warehouses-assigned";

type Props = {
  params: Promise<{ roleId: string }>;
};
export default async function Page({ params }: Props) {
  const { roleId } = await params;

  return (
    <div>
      <RoleDetails roleId={roleId} />
      <RoleWarehousesAssigned roleId={roleId} />
      <PermissionsInRoleTable roleId={roleId} />
    </div>
  );
}
