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
import { useFieldArray, useForm } from "react-hook-form";
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
import { useCreateRoleMutation } from "@/hooks/mutations/create-role.mutation";
import { useQuery } from "@tanstack/react-query";
import { createListPermissionsQueryOptions } from "@/hooks/queries/list-permissions.query";
import { Checkbox } from "@/components/ui/checkbox";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { InfoIcon } from "lucide-react";

const PERMISSIONS_MAX_COUNT = 999;

export default function Page() {
  const router = useRouter();
  const { toast } = useToast();
  const createRoleMutation = useCreateRoleMutation();
  const listPermissionsQuery = useQuery(
    createListPermissionsQueryOptions({
      pageSize: PERMISSIONS_MAX_COUNT,
    }),
  );

  const createRoleForm = useForm<CreateRoleBodySchema>({
    resolver: zodResolver(createRoleBodySchema),
    defaultValues: {
      name: "",
      description: "",
      permissionIds: [],
    },
  });

  const onSubmit = createRoleForm.handleSubmit((values) => {
    createRoleMutation.mutate(values, {
      onSuccess: (data) => {
        toast({
          title: "Role created successfully",
          description: "The new role has been created.",
        });
        router.push(`/roles/${data.id}`);
      },
      onError: (error) => {
        toast({
          title: "Role creation failed",
          description: error.message,
        });
        switch (error.type) {
          case "ValidationError":
            mapFieldErrorToFormError(createRoleForm.setError, error.errors);
        }
      },
    });
  });

  return (
    <Card className="mx-auto w-full space-y-6">
      <CardHeader>
        <CardTitle>Create Role</CardTitle>
        <CardDescription>
          Fill out the form below to create a new role.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...createRoleForm}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={createRoleForm.control}
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
              control={createRoleForm.control}
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
              control={createRoleForm.control}
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
              disabled={createRoleMutation.isPending}
            >
              Create Role
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
