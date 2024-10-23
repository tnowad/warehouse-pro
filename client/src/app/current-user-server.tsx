import { getCurrentUser } from "@/lib/api/endpoints/get-current-user";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "./get-query-client";
import { cookies } from "next/headers";

export async function CurrentUserServer({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return <>{children}</>;
  }

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["current-user"],
    queryFn: () =>
      getCurrentUser(undefined, {
        ...(accessToken && {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
