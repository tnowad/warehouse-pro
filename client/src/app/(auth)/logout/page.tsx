"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { COOKIE_KEY_ACCESS_TOKEN, COOKIE_KEY_REFRESH_TOKEN } from "@/constants";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryClient } from "@/app/get-query-client";

export default function LogoutPage() {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = getQueryClient();

  const handleLogout = () => {
    deleteCookie(COOKIE_KEY_ACCESS_TOKEN);
    deleteCookie(COOKIE_KEY_REFRESH_TOKEN);
    queryClient.clear();
    toast({
      title: "Logout successful",
      description: "You have been logged out.",
    });
    router.push("/login");
  };

  return (
    <Card className="mx-auto w-full max-w-md space-y-6">
      <CardHeader>
        <CardTitle>Logout</CardTitle>
        <CardDescription>Are you sure you want to log out?</CardDescription>
      </CardHeader>
      <div className="space-y-4 px-4 pb-4">
        <Button className="w-full" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </Card>
  );
}
