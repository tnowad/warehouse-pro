import { UserDetailsCard } from "./_components/user-details-card";

export default async function Page({ params }: PageProps) {
  const { userId } = await params;

  return (
    <div>
      <UserDetailsCard userId={userId} />
    </div>
  );
}
