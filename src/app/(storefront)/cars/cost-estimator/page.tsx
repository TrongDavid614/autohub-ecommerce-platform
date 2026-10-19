// ─── On-Road Cost Estimator Page ─────────────────────────────────────────────
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tính giá lăn bánh | AutoHub',
  description: 'Ước tính chi phí lăn bánh theo tỉnh thành cho từng phiên bản xe điện.',
};

type SearchParams = Promise<{
  variantId?: string;
  province?: string;
}>;

export default async function CostEstimatorPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { variantId, province } = await searchParams;

  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-slate-50">
        Tính giá lăn bánh
      </h1>

      {/*
        TODO: <CostEstimatorForm defaultVariantId={variantId} defaultProvince={province} />
        - Province select (from carService.listProvinces())
        - Variant select
        - Breakdown table: MSRP, phí đăng ký, thuế trước bạ, VAT, bảo hiểm, phí biển số
        - Total row highlighted with sky-500
      */}
    </section>
  );
}
