"use client";

import { ErrorAlert } from "@/components/error";

export default function Error({ error }: { error: { message: string } }) {
  return <ErrorAlert title="Error" description={error.message} />;
}
