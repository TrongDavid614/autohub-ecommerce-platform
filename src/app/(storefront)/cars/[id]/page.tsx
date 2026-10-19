// ─── Vehicle Detail Page ──────────────────────────────────────────────────────
// Features: 360° viewer, color picker, variant selector, on-road price preview
import type { Metadata } from 'next';

type Params = Promise<{ id: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;
  // TODO: Fetch model from carService.getModel(id) for dynamic metadata
  return {
    title: `Chi tiết xe ${id} | AutoHub`,
    description: 'Xem thông số kỹ thuật, màu sắc và giá xe tại AutoHub.',
  };
}

export default async function CarDetailPage({ params }: { params: Params }) {
  const { id } = await params;

  return (
    <section className="container mx-auto px-4 py-10">
      {/* TODO: <Car360Viewer modelId={id} /> */}
      {/* TODO: <CarColorPicker /> */}
      {/* TODO: <CarVariantSelector /> */}
      {/* TODO: <TechnicalSpecsTable /> */}
      {/* TODO: <PricingCard variantId={id} /> */}
      {/* TODO: <CompareAddButton variantId={id} /> */}

      <p className="text-sm text-slate-400">Model ID: {id}</p>
    </section>
  );
}
