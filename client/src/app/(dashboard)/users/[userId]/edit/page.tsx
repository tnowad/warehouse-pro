import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserDetailsUpdateForm } from "./_components/user-details-update-form";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Page({ params }: PageProps) {
  const { userId } = await params;

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle>Update User</CardTitle>
        <CardDescription>Edit the user details below.</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Skeleton className="w-full h-96" />}>
          <UserDetailsUpdateForm userId={userId} />
        </Suspense>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/users" className="text-sm hover:text-primary">
          Back to Users
        </Link>
      </CardFooter>
    </Card>
  );
}
