"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { CopyIcon } from "lucide-react";
import { useRouter } from "next/navigation";
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
import { createGetRoleDetailsQueryOptions } from "@/hooks/queries/get-role-details.query";
import { useQuery } from "@tanstack/react-query";

type RoleDetailProps = {
  roleId: string;
};

export function RoleDetails({ roleId }: RoleDetailProps) {
  const router = useRouter();
  const roleDetailsQuery = useQuery(
    createGetRoleDetailsQueryOptions({ id: roleId }),
  );

  const role = roleDetailsQuery.data;

  if (roleDetailsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (roleDetailsQuery.isError) {
    return <div>Error</div>;
  }

  if (!role) {
    return <div>Role not found</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          {role.name}
          <Button
            size={"icon"}
            variant={"outline"}
            onClick={() => {
              window.navigator.clipboard.writeText(role.id);
            }}
          >
            <CopyIcon />
            <span className="sr-only">Copy Role ID</span>
          </Button>
        </CardTitle>
        <CardDescription>Updated: {role.updatedAt}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="font-semibold">Role Information</div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div>Name</div>
              <div>{role.name}</div>
            </div>

            <div>
              <div>Description</div>
              <div>{role.description}</div>
            </div>

            <div>
              <div>Permissions</div>
            </div>

            <div>
              <div>Created At</div>
              <div>{role.createdAt}</div>
            </div>

            <div>
              <div>Updated At</div>
              <div>{role.updatedAt}</div>
            </div>
          </div>
        </div>
        <Separator />
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size={"sm"} variant={"ghost"}>
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this role?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. Please proceed with caution.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  roleSoftDeleteMutation.mutate();
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button size={"sm"} variant={"ghost"}>
          Deactivate
        </Button>
        <Button
          size={"sm"}
          onClick={() => {
            router.push(`/roles/${role.id}/edit`);
          }}
        >
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
}
