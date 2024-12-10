"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  CopyIcon,
  Trash2Icon,
  PencilIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react";

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
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createGetRoleDetailsQueryOptions } from "@/hooks/queries/get-role-details.query";
import { useDeleteRoleMutation } from "@/hooks/mutations/delete-role.mutation";
import { createListRolePermissionsQuery } from "@/hooks/queries/list-role-permissions.query";
import { RoleDetailsSkeleton } from "./role-details-skeleton";

type RoleDetailProps = {
  roleId: string;
};

export function RoleDetails({ roleId }: RoleDetailProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [showPermissions, setShowPermissions] = useState(false);

  const roleDetailsQuery = useQuery(
    createGetRoleDetailsQueryOptions({ id: roleId }),
  );
  const listRolePermissionsQuery = useQuery(
    createListRolePermissionsQuery({ id: roleId }),
  );

  const deleteRoleMutation = useDeleteRoleMutation({ roleId });
  const onDelete = () =>
    deleteRoleMutation.mutate(undefined, {
      onSuccess(data) {
        toast({
          title: "Role deleted successfully",
          description: data.message,
        });
        router.push("/roles");
      },
    });

  const role = roleDetailsQuery.data;
  const permissions = listRolePermissionsQuery.data?.items;

  const copyRoleId = () => {
    if (role) {
      navigator.clipboard.writeText(role.id);
      toast({
        title: "Role ID copied",
        description: "The role ID has been copied to your clipboard.",
      });
    }
  };

  if (roleDetailsQuery.isLoading) {
    return <RoleDetailsSkeleton />;
  }

  if (roleDetailsQuery.isError) {
    return (
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>
            Failed to load role details. Please try again later.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild>
            <Link href="/roles">
              <ChevronLeftIcon className="mr-2 h-4 w-4" /> Back to Roles
            </Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (!role) {
    return (
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle>Role not found</CardTitle>
          <CardDescription>
            The requested role could not be found.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild>
            <Link href="/roles">
              <ChevronLeftIcon className="mr-2 h-4 w-4" /> Back to Roles
            </Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{role.name}</CardTitle>
          <Button size="sm" variant="outline" onClick={copyRoleId}>
            <CopyIcon className="mr-2 h-4 w-4" /> Copy ID
          </Button>
        </div>
        <CardDescription>
          Last updated: {new Date(role.updatedAt).toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Role Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-medium text-muted-foreground">Name</div>
                <div>{role.name}</div>
              </div>
              <div>
                <div className="font-medium text-muted-foreground">
                  Description
                </div>
                <div>{role.description || "No description provided"}</div>
              </div>
              <div>
                <div className="font-medium text-muted-foreground">
                  Created At
                </div>
                <div>{new Date(role.createdAt).toLocaleString()}</div>
              </div>
              <div>
                <div className="font-medium text-muted-foreground">
                  Updated At
                </div>
                <div>{new Date(role.updatedAt).toLocaleString()}</div>
              </div>
            </div>
          </div>
          <div>
            <Button
              variant="ghost"
              className="pl-0"
              onClick={() => setShowPermissions(!showPermissions)}
            >
              <p>Permissions</p>
              {showPermissions ? (
                <ChevronUpIcon className="ml-2 h-4 w-4" />
              ) : (
                <ChevronDownIcon className="ml-2 h-4 w-4" />
              )}
            </Button>
            {showPermissions && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permissions?.map((permission) => (
                    <TableRow key={permission.id}>
                      <TableCell>{permission.name}</TableCell>
                      <TableCell>{permission.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild variant="ghost">
          <Link href="/roles">
            <ChevronLeftIcon className="mr-2 h-4 w-4" /> Back to Roles
          </Link>
        </Button>
        <div className="space-x-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2Icon className="mr-2 h-4 w-4" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this role?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. All permissions associated with
                  this role will be removed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button size="sm" asChild>
            <Link href={`/roles/${role.id}/edit`}>
              <PencilIcon className="mr-2 h-4 w-4" /> Edit
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
