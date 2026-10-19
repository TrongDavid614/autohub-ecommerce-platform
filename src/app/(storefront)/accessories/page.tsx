// ─── Accessories Catalog Page ─────────────────────────────────────────────────
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Phụ kiện xe điện | AutoHub',
  description: 'Phụ kiện chính hãng, lọc theo năm và model xe tương thích.',
};

type SearchParams = Promise<{
  category?: string;
  brand?: string;
  compatibleModel?: string;
  compatibleYear?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: string;
  sort?: string;
}>;

export default async function AccessoriesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const filters = await searchParams;

  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-slate-50">Phụ kiện xe điện</h1>

      {/*
        TODO: <AccessoryFilter filters={filters} />
        - compatibleYear select: filters accessories by CompatibilityYear range
        - compatibleModel select
        - category chips
        - price range slider

        TODO: <AccessoryGrid filters={filters} />
        - Card: thumbnail, name, price, original price, add-to-cart button
        - Each card shows compatible years badge
      */}

      <pre className="hidden text-xs text-slate-500">
        {JSON.stringify(filters, null, 2)}
      </pre>
    </section>
  );
}
