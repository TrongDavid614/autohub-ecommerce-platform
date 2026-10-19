// ─── Vehicle Listing & Filter Page ───────────────────────────────────────────
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Xe điện | AutoHub',
  description: 'Khám phá danh mục xe điện chính hãng tại AutoHub 3S Dealership.',
};

type SearchParams = Promise<{
  brand?: string;
  segment?: string;
  minPrice?: string;
  maxPrice?: string;
  minRange?: string;
  year?: string;
  page?: string;
  sort?: string;
}>;

export default async function CarsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const filters = await searchParams;

  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-slate-50">
        Danh sách xe điện
      </h1>

      {/* TODO: <CarFilterSidebar filters={filters} /> */}
      {/* TODO: <CarModelGrid filters={filters} /> */}

      <pre className="hidden text-xs text-slate-500">
        {JSON.stringify(filters, null, 2)}
      </pre>
    </section>
  );
}
