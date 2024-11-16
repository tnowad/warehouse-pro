"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { mapFieldErrorToFormError } from "@/lib/utils";
import {
  createRoleBodySchema,
  CreateRoleBodySchema,
} from "@/lib/apis/create-role.api";
import { useUpdateRoleMutation } from "@/hooks/mutations/update-role.mutation";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createListPermissionsQueryOptions } from "@/hooks/queries/list-permissions.query";
import { createGetRoleDetailsQueryOptions } from "@/hooks/queries/get-role-details.query";
import { Checkbox } from "@/components/ui/checkbox";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { InfoIcon } from "lucide-react";

const PERMISSIONS_MAX_COUNT = 999;

export function UpdateRolePage({ roleId }: { roleId: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const updateRoleMutation = useUpdateRoleMutation({ roleId });
  const listPermissionsQuery = useQuery(
    createListPermissionsQueryOptions({
      pageSize: PERMISSIONS_MAX_COUNT,
    }),
  );
  const getRoleDetailsQuery = useSuspenseQuery(
    createGetRoleDetailsQueryOptions({
      id: roleId,
    }),
  );

  const updateRoleForm = useForm<CreateRoleBodySchema>({
    resolver: zodResolver(createRoleBodySchema),
    defaultValues: {
      name: getRoleDetailsQuery.data?.name || "",
      description: getRoleDetailsQuery.data?.description || "",
      permissionIds: getRoleDetailsQuery.data?.permissions.map((p) => p.id),
    },
  });

  const onSubmit = updateRoleForm.handleSubmit((values) => {
    updateRoleMutation.mutate(values, {
      onSuccess: () => {
        toast({
          title: "Role updated successfully",
          description: "The role has been updated.",
        });
        router.push(`/roles/${roleId}`);
      },
      onError: (error) => {
        toast({
          title: "Role update failed",
          description: error.message,
        });
        switch (error.type) {
          case "ValidationError":
            mapFieldErrorToFormError(updateRoleForm.setError, error.errors);
        }
      },
    });
  });

  return (
    <Card className="mx-auto w-full space-y-6">
      <CardHeader>
        <CardTitle>Update Role</CardTitle>
        <CardDescription>
          Update the information for the role below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...updateRoleForm}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={updateRoleForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Role Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the name of the role (e.g., Admin, User).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={updateRoleForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Role Description" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter a brief description of the role.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={updateRoleForm.control}
              name="permissionIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Permissions</FormLabel>
                  <FormControl>
                    <div className="space-y-1 grid lg:grid-cols-2">
                      {listPermissionsQuery.data?.items.map((permission) => (
                        <div
                          key={permission.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            value={permission.id}
                            checked={field.value?.includes(permission.id)}
                            onCheckedChange={(checked) => {
                              const newPermissions = checked
                                ? [...(field.value ?? []), permission.id]
                                : field.value?.filter(
                                    (p) => p !== permission.id,
                                  );
                              field.onChange(newPermissions);
                            }}
                            id={`permission-${permission.id}`}
                          />

                          <label htmlFor={`permission-${permission.id}`}>
                            {permission.name}
                          </label>
                          <HoverCard>
                            <HoverCardTrigger>
                              <InfoIcon className="size-4" />
                            </HoverCardTrigger>
                            <HoverCardContent>
                              {permission.description}
                            </HoverCardContent>
                          </HoverCard>
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Select the permissions for this role.
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button
              className="w-full mt-4"
              type="submit"
              disabled={updateRoleMutation.isPending}
            >
              Update Role
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/roles" className="text-sm hover:text-primary">
          Back to Roles
        </Link>
      </CardFooter>
    </Card>
  );
}
