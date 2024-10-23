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
import { useLoginMutation } from "@/hooks/apis/auth";
import { useRouter } from "next/navigation";
import {
  loginRequestSchema,
  LoginRequestSchema,
} from "@/lib/api/schemas/login-request-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { mapFieldErrorToFormError } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const loginMutation = useLoginMutation();

  const loginForm = useForm<LoginRequestSchema>({
    resolver: zodResolver(loginRequestSchema),
    defaultValues: {
      email: "admin@warehouse-pro.com",
      password: "Password@123",
    },
  });

  const onSubmit = loginForm.handleSubmit((values) => {
    loginMutation.mutate(values, {
      onSuccess: () => {
        toast({
          title: "Login successful",
          description: "You have been logged in",
        });
        router.push("/");
      },
      onError: (error) => {
        toast({
          title: "Login failed",
          description: error.message,
        });
        switch (error.type) {
          case "ValidationError":
            mapFieldErrorToFormError(loginForm.setError, error.errors);
        }
      },
    });
  });

  return (
    <Card className="mx-auto w-full max-w-md space-y-6">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your email and password to log in or use one of the options
          below.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...loginForm}>
          <form onSubmit={onSubmit}>
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@infinity.net" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the email address associated with your account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your password must be at least 8 characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full mt-4"
              type="submit"
              disabled={loginMutation.isPending}
            >
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/forgot-password" className="text-sm hover:text-primary">
          Forgot Password?
        </Link>
        <p className="text-sm">
          {"Don't have an account? "}
          <Link href="/sign-up" className="hover:text-primary">
            Sign Up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
