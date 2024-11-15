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
import { useCreateRoleMutation } from "@/hooks/mutations/create-role.mutation";

export default function Page() {
  const router = useRouter();
  const { toast } = useToast();
  const createRoleMutation = useCreateRoleMutation();

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
      onSuccess: () => {
        toast({
          title: "Role created successfully",
          description: "The new role has been created.",
        });
        router.push("/roles");
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
      <CardContent className="space-y-4">
        <Form {...createRoleForm}>
          <form onSubmit={onSubmit}>
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
                    <div className="space-y-2">
                      {["View", "Edit", "Delete", "Manage"].map(
                        (permission) => (
                          <div
                            key={permission}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              value={permission}
                              checked={field.value?.includes(permission)}
                              onChange={(e) => {
                                const newPermissions = e.target.checked
                                  ? [...(field.value ?? []), permission]
                                  : field.value?.filter(
                                      (p) => p !== permission,
                                    );
                                field.onChange(newPermissions);
                              }}
                              id={`permission-${permission}`}
                            />
                            <label htmlFor={`permission-${permission}`}>
                              {permission}
                            </label>
                          </div>
                        ),
                      )}
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
