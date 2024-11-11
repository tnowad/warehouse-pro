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
import { createGetUserDetailsQueryOptions } from "@/hooks/queries/get-user-details.query";
import { useQuery } from "@tanstack/react-query";

type UserDetailsCardProps = {
  userId: string;
};
export function UserDetailsCard({ userId }: UserDetailsCardProps) {
  const { data, isLoading, error } = useQuery(
    createGetUserDetailsQueryOptions({ userId }),
  );

  if (isLoading) {
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

  if (error) {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex justify-between">
            <div>ID:</div>
            <div>{data?.id}</div>
          </div>

          <div className="flex justify-between">
            <div>Email:</div>
            <div>{data?.email}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          size="sm"
          onClick={() => console.log("Edit user")}
        >
          Edit User
        </Button>
      </CardFooter>
    </Card>
  );
}
