import { UserDetailsCard } from "./_components/user-details-card";

type PageProps = {
  params: Promise<{ userId: string }>;
};
export default async function Page({ params }: PageProps) {
  const { userId } = await params;

  return (
    <div>
      <UserDetailsCard userId={userId} />
    </div>
  );
}
