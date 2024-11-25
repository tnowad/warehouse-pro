"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteUserMutation } from "@/hooks/mutations/delete-user.mutation";
import { createGetUserDetailsQueryOptions } from "@/hooks/queries/get-user-details.query";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { createGetUserRolesQueryOptions } from "@/hooks/queries/get-user-roles.query";

type UserDetailsCardProps = {
  userId: string;
};

export function UserDetailsCard({ userId }: UserDetailsCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const getUserDetailsQuery = useQuery(
    createGetUserDetailsQueryOptions({ userId }),
  );
  const getUserRolesQuery = useQuery(
    createGetUserRolesQueryOptions({ userId }),
  );

  const deleteUserMutation = useDeleteUserMutation({ userId });

  const onDelete = () =>
    deleteUserMutation.mutate(undefined, {
      onSuccess(data) {
        toast({
          title: "User Deleted",
          description: data.message,
        });
        router.push("/users");
      },
    });

  if (getUserDetailsQuery.isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading User Details...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (getUserDetailsQuery.error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error Fetching Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              There was an issue fetching the user details. Please try again
              later.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }
  const { data } = getUserDetailsQuery;

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="">
            <div>ID:</div>
            <div>{data?.id}</div>
          </div>

          <div className="">
            <div>Email:</div>
            <div>{data?.email}</div>
          </div>

          <div>
            <div>Roles:</div>
            <div className="flex gap-2 flex-wrap">
              {getUserRolesQuery.isLoading ? (
                <Skeleton className="h-6 w-1/4" />
              ) : getUserRolesQuery.error ? (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    There was an issue fetching the user roles. Please try again
                    later.
                  </AlertDescription>
                </Alert>
              ) : (
                getUserRolesQuery.data?.items?.map((role) => (
                  <Badge key={role.id}>{role.name}</Badge>
                ))
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="space-x-2">
        <Button variant={"ghost"} size="sm" asChild>
          <Link href="/users" className="mr-auto">
            <ArrowLeft />
            Back to Users
          </Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm">
              Delete User
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                user.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button size="sm">
          <Link href={`/users/${userId}/edit`}>Edit User</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
