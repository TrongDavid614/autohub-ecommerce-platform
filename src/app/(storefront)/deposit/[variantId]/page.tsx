// ─── Car Deposit Checkout Page ────────────────────────────────────────────────
// 72-hour online deposit with VNPay redirect
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đặt cọc xe | AutoHub',
  description: 'Đặt cọc xe điện trực tuyến 72 giờ qua cổng thanh toán VNPay.',
};

type Params = Promise<{ variantId: string }>;

export default async function DepositPage({ params }: { params: Params }) {
  const { variantId } = await params;

  return (
    <section className="container mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-2 text-2xl font-bold text-slate-50">Đặt cọc xe</h1>
      <p className="mb-8 text-sm text-slate-400">
        Xe sẽ được giữ cho bạn trong <span className="text-sky-400 font-semibold">72 giờ</span> sau khi thanh toán thành công.
      </p>

      {/*
        TODO: <DepositCheckoutForm variantId={variantId} />
        - Uses react-hook-form + zodResolver(depositSchema)
        - Fields: buyerFullName, buyerCccd, buyerPhone, showroomId, colorName, amount (10M / 20M)
        - Submit → depositService.createDeposit() → redirect to paymentUrl
      */}

      <p className="text-xs text-slate-500">Variant ID: {variantId}</p>
    </section>
  );
}
