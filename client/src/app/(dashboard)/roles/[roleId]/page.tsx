import { RoleDetails } from "./_components/role-details";

type Props = {
  params: Promise<{ roleId: string }>;
};
export default async function Page({ params }: Props) {
  const { roleId } = await params;

  return (
    <div>
      <RoleDetails roleId={roleId} />
    </div>
  );
}
