// ─── Car Comparison Matrix Page ───────────────────────────────────────────────
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'So sánh xe | AutoHub',
  description: 'So sánh thông số kỹ thuật và giá cả giữa các phiên bản xe điện.',
};

export default function CarComparePage() {
  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-slate-50">So sánh xe</h1>

      {/*
        TODO: <CompareMatrix />
        - Reads up to 3 slots from useCompareStore
        - Renders side-by-side column table of TechnicalSpecs
        - Each column has: image, name, price, specs rows, CTA buttons
      */}

      <p className="text-sm text-slate-400">
        Chọn tối đa 3 phiên bản xe để so sánh.
      </p>
    </section>
  );
}
