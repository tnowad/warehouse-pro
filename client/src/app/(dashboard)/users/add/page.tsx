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
  createUserBodySchema,
  CreateUserBodySchema,
} from "@/lib/apis/create-user.api";
import { useCreateUserMutation } from "@/hooks/mutations/create-user.mutation";
import { MultipleSelector } from "@/components/ui/multiple-selector";

export default function Page() {
  const router = useRouter();
  const { toast } = useToast();
  const createUserMutation = useCreateUserMutation();

  const createuserForm = useForm<CreateUserBodySchema>({
    resolver: zodResolver(createUserBodySchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      roleIds: [],
    },
  });

  const onSubmit = createuserForm.handleSubmit((values) => {
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
        switch (error.type) {
          case "ValidationError":
            mapFieldErrorToFormError(createuserForm.setError, error.errors);
        }
      },
    });
  });

  return (
    <Card className="mx-auto w-full space-y-6">
      <CardHeader>
        <CardTitle>Add User</CardTitle>
        <CardDescription>
          Fill out the form below to add a new user.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...createuserForm}>
          <form onSubmit={onSubmit}>
            <FormField
              control={createuserForm.control}
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
              control={createuserForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@domain.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the user's email address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={createuserForm.control}
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
              control={createuserForm.control}
              name="roleIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Roles</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      {...field}
                      // TODO: Replace the defaultOptions with the actual roles from the API
                      defaultOptions={[
                        {
                          label: "React",
                          value: "react",
                        },
                        {
                          label: "Vue",
                          value: "vue",
                        },
                        {
                          label: "Angular",
                          value: "angular",
                        },
                      ]}
                      value={field.value.map((v) => ({
                        label: v,
                        value: v,
                      }))}
                      onChange={(value) => {
                        field.onChange(value.map((v) => v.value));
                      }}
                      placeholder="Select frameworks you like..."
                      emptyIndicator={
                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                          no results found.
                        </p>
                      }
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Select the role(s) for the user.
                  </FormDescription>
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
          Back to Users
        </Link>
      </CardFooter>
    </Card>
  );
}
