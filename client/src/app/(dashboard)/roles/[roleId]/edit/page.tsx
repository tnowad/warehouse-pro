import { UpdateRolePage } from "./_components/update-role-form";

export default async function Page({
  params,
}: {
  params: Promise<{ roleId: string }>;
}) {
  const { roleId } = await params;
  return <UpdateRolePage roleId={roleId} />;
}
