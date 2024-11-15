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
import { cn, mapFieldErrorToFormError } from "@/lib/utils";
import {
  createUserBodySchema,
  CreateUserBodySchema,
} from "@/lib/apis/create-user.api";
import { useCreateUserMutation } from "@/hooks/mutations/create-user.mutation";
import { createListRolesInfiniteQueryOptions } from "@/hooks/queries/list-roles.query";
import { useInfiniteQuery } from "@tanstack/react-query";
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
import { useCallback, useMemo, useRef, useState } from "react";
import { useDebounce } from "@/components/ui/multiple-selector";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  const router = useRouter();
  const { toast } = useToast();
  const createUserMutation = useCreateUserMutation();
  const [roleSearchQuery, setRoleSearchQuery] = useState("");
  const debouncedRoleSearchQuery = useDebounce(roleSearchQuery, 300);

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

  const createUserForm = useForm<
    CreateUserBodySchema & {
      roles: Record<string, string>;
    }
  >({
    resolver: zodResolver(createUserBodySchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      roleIds: [],
    },
  });

  const onSubmit = createUserForm.handleSubmit((values) => {
    createUserMutation.mutate(values, {
      onSuccess: () => {
        toast({
          title: "User added successfully",
          description: "The user has been added.",
        });
        router.push("/users");
      },
      onError: (error) => {
        toast({
          title: "User creation failed",
          description: error.message,
        });
        if (error.type === "ValidationError") {
          mapFieldErrorToFormError(createUserForm.setError, error.errors);
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
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle>Add User</CardTitle>
        <CardDescription>
          Fill out the form below to add a new user.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...createUserForm}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={createUserForm.control}
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
              control={createUserForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@domain.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    {`Enter the user's email address.`}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={createUserForm.control}
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
              control={createUserForm.control}
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
                          {field.value.length ? (
                            <span className="space-x-1">
                              {field.value.slice(0, 3).map((roleId) => (
                                <Badge key={roleId}>
                                  {createUserForm.getValues("roles")[roleId]}
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
                                  if (field.value.includes(role.id)) {
                                    field.onChange(
                                      field.value.filter(
                                        (id) => id !== role.id,
                                      ),
                                    );
                                  } else {
                                    field.onChange([...field.value, role.id]);

                                    createUserForm.setValue("roles", {
                                      ...createUserForm.getValues("roles"),
                                      [role.id]: role.name,
                                    });
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
              disabled={createUserMutation.isPending}
            >
              Add User
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/users" className="text-sm hover:text-primary">
          Back to users list
        </Link>
      </CardFooter>
    </Card>
  );
}
