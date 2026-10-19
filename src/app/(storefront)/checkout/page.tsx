// ─── Checkout Page ────────────────────────────────────────────────────────────
// Protected: ROLE_CUSTOMER required (enforced by proxy.ts)
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thanh toán | AutoHub',
  description: 'Hoàn tất đơn hàng phụ kiện và thanh toán qua VNPay.',
};

export default function CheckoutPage() {
  return (
    <section className="container mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-slate-50">Thanh toán</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/*
            TODO: <ShippingAddressForm />
            - react-hook-form with Zod: recipientName, phone, street, ward, district, province
            - Address book: load saved addresses from user profile
          */}
        </div>

        <div>
          {/*
            TODO: <OrderSummaryCard />
            - List of cart items (read-only)
            - Subtotal, shipping fee, discount code input
            - Total
            - Place Order → accessoryService.checkout() → redirect to VNPay
          */}
        </div>
      </div>
    </section>
  );
}
