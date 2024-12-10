import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function RoleDetailsSkeleton() {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-1/4 mt-2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Skeleton className="h-6 w-1/4 mb-2" />
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-1/3 mb-1" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          </div>
          <Skeleton className="h-px w-full" />
          <div>
            <Skeleton className="h-6 w-1/4 mb-2" />
            <div className="flex flex-wrap gap-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-20" />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Skeleton className="h-9 w-32" />
        <div className="space-x-2">
          <Skeleton className="h-9 w-24 inline-block" />
          <Skeleton className="h-9 w-24 inline-block" />
        </div>
      </CardFooter>
    </Card>
  );
}
