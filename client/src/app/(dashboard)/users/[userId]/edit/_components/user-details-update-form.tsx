"use client";
import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn, mapFieldErrorToFormError } from "@/lib/utils";
import {
  useInfiniteQuery,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDebounce } from "@/components/ui/multiple-selector";
import { Badge } from "@/components/ui/badge";
import { createGetUserDetailsQueryOptions } from "@/hooks/queries/get-user-details.query";
import { createListRolesInfiniteQueryOptions } from "@/hooks/queries/list-roles.query";
import { useUpdateUserMutation } from "@/hooks/mutations/update-user.mutation";
import {
  updateUserBodySchema,
  UpdateUserBodySchema,
} from "@/lib/apis/update-user.api";
import { RoleSchema } from "@/lib/schemas/role.schema";
import { Skeleton } from "@/components/ui/skeleton";
import { createGetUserRolesQueryOptions } from "@/hooks/queries/get-user-roles.query";
import { getUserRolesApi } from "@/lib/apis/get-user-roles.api";

type UserDetailsUpdateFormProps = {
  userId: string;
};

export const UserDetailsUpdateForm = ({
  userId,
}: UserDetailsUpdateFormProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const updateUserMutation = useUpdateUserMutation({ userId });
  const [roleSearchQuery, setRoleSearchQuery] = useState("");
  const debouncedRoleSearchQuery = useDebounce(roleSearchQuery, 300);

  const getUserDetailsQuery = useSuspenseQuery(
    createGetUserDetailsQueryOptions({ userId }),
  );

  const getUserRolesQuery = useQuery(
    createGetUserRolesQueryOptions({ userId }),
  );

  const listRolesInfinityQuery = useInfiniteQuery(
    createListRolesInfiniteQueryOptions({
      query: debouncedRoleSearchQuery,
    }),
  );

  const lastRoleCommandItemObserver = useRef<IntersectionObserver>(null);
  const lastRoleCommandItemElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (listRolesInfinityQuery.isLoading) return;
      if (lastRoleCommandItemObserver.current)
        lastRoleCommandItemObserver.current.disconnect();
      lastRoleCommandItemObserver.current = new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            listRolesInfinityQuery.hasNextPage &&
            !listRolesInfinityQuery.isFetching
          ) {
            listRolesInfinityQuery.fetchNextPage();
          }
        },
      );
      if (node) lastRoleCommandItemObserver.current.observe(node);
    },
    [listRolesInfinityQuery],
  );

  const updateUserForm = useForm<
    UpdateUserBodySchema & { roles: RoleSchema[] }
  >({
    resolver: zodResolver(updateUserBodySchema),
    defaultValues: {
      roleIds: [],
      ...getUserDetailsQuery.data,
    },
  });

  useEffect(() => {
    if (getUserDetailsQuery.isSuccess && getUserRolesQuery.isSuccess) {
      updateUserForm.reset({
        name: getUserDetailsQuery.data.name,
        email: getUserDetailsQuery.data.email,
        password: "",
        roleIds: getUserRolesQuery.data?.items.map((role) => role.id),
        roles: getUserRolesQuery.data.items,
      });
    } else if (getUserDetailsQuery.isError) {
      toast({
        title: "User details fetch failed",
        description: getUserDetailsQuery.error?.message,
      });
    }
  }, [
    getUserDetailsQuery.data,
    getUserDetailsQuery.error?.message,
    getUserDetailsQuery.isError,
    getUserDetailsQuery.isSuccess,
    getUserRolesQuery.data,
    getUserRolesQuery.isSuccess,
    toast,
    updateUserForm,
  ]);

  const onSubmit = updateUserForm.handleSubmit((values) => {
    updateUserMutation.mutate(values, {
      onSuccess: () => {
        toast({
          title: "User updated successfully",
          description: "The user information has been updated.",
        });
        router.push("/users");
      },
      onError: (error) => {
        toast({
          title: "User update failed",
          description: error.message,
        });
        if (error.type === "ValidationError") {
          mapFieldErrorToFormError(updateUserForm.setError, error.errors);
        }
      },
    });
  });

  const roles = useMemo(
    () =>
      listRolesInfinityQuery.data?.pages.flatMap((page) => page.items) ?? [],
    [listRolesInfinityQuery],
  );

  return (
    <Form {...updateUserForm}>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={updateUserForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Full Name" {...field} />
              </FormControl>
              <FormDescription>
                Enter the full name of the user.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={updateUserForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@domain.com" {...field} />
              </FormControl>
              <FormDescription>Enter the user's email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={updateUserForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormDescription>
                Password must be at least 8 characters.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={updateUserForm.control}
          name="roleIds"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Roles</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value && field.value.length ? (
                        <span className="space-x-1">
                          {field.value.slice(0, 3).map((roleId) => (
                            <Badge key={roleId}>
                              {roles.find((role) => role.id === roleId)?.name}
                            </Badge>
                          ))}
                          {field.value.length > 3 && (
                            <Badge>+{field.value.length - 3} more</Badge>
                          )}
                        </span>
                      ) : (
                        "Select role"
                      )}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command shouldFilter={false}>
                    <CommandInput
                      placeholder="Search roles..."
                      value={roleSearchQuery}
                      onValueChange={setRoleSearchQuery}
                    />
                    <CommandList>
                      <CommandEmpty>No roles found.</CommandEmpty>
                      <CommandGroup>
                        {roles.map((role) => (
                          <CommandItem
                            value={role.id}
                            key={role.id}
                            onSelect={() => {
                              if (field.value?.includes(role.id)) {
                                field.onChange(
                                  field.value.filter((id) => id !== role.id),
                                );
                                updateUserForm.setValue(
                                  "roles",
                                  updateUserForm
                                    .getValues("roles")
                                    .filter((r) => r.id !== role.id),
                                );
                              } else {
                                field.onChange([
                                  ...(field.value ?? []),
                                  role.id,
                                ]);
                                updateUserForm.setValue("roles", [
                                  ...updateUserForm.getValues("roles"),
                                  role,
                                ]);
                              }
                            }}
                          >
                            <Checkbox
                              checked={field.value?.includes(role.id)}
                            />
                            {role.name}
                          </CommandItem>
                        ))}
                        {listRolesInfinityQuery.hasNextPage && (
                          <CommandItem ref={lastRoleCommandItemElementRef}>
                            Loading roles...
                          </CommandItem>
                        )}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This user will have the selected roles.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full mt-4"
          type="submit"
          disabled={
            updateUserMutation.isPending || getUserDetailsQuery.isLoading
          }
        >
          Update User
        </Button>
      </form>
    </Form>
  );
};
