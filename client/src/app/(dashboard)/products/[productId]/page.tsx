import { ProductDetailsCard } from "./_components/product-details-card";

export default async function Page({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  return <ProductDetailsCard productId={productId} />;
}
