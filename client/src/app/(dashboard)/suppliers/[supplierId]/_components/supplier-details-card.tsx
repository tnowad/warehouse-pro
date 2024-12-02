"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

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
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { createGetSupplierDetailsQuery as createGetSupplierDetailsQueryOptions } from "@/hooks/queries/get-supplier-details.query";
import { useDeleteSupplierMutation } from "@/hooks/mutations/delete-supplier.mutation";

type SupplierDetailsCardProps = {
  supplierId: string;
};

export function SupplierDetailsCard({ supplierId }: SupplierDetailsCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const getSupplierDetailsQuery = useQuery(
    createGetSupplierDetailsQueryOptions({ supplierId }),
  );

  const deleteSupplierMutation = useDeleteSupplierMutation({ supplierId });

  const onDelete = () =>
    deleteSupplierMutation.mutate(undefined, {
      onSuccess(data) {
        toast({
          title: "Supplier Deleted",
          description: data.message,
        });
        router.push("/suppliers");
      },
    });

  if (getSupplierDetailsQuery.isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Supplier Details...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (getSupplierDetailsQuery.error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error Fetching Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              There was an issue fetching the supplier details. Please try again
              later.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }
  const { data } = getSupplierDetailsQuery;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Supplier Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div>ID:</div>
            <div>{data?.id}</div>
          </div>

          <div>
            <div>Name:</div>
            <div>{data?.name}</div>
          </div>

          <div>
            <div>Contact Info:</div>
            <div>{data?.contactInfo}</div>
          </div>

          <div>
            <div>Address:</div>
            <div>{data?.address}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="space-x-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/suppliers" className="mr-auto">
            <ArrowLeft />
            Back to Suppliers
          </Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm">
              Delete Supplier
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                supplier.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button size="sm">
          <Link href={`/suppliers/${supplierId}/edit`}>Edit Supplier</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}