// ─── Shopping Cart Page ───────────────────────────────────────────────────────
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Giỏ hàng | AutoHub',
  description: 'Xem và quản lý giỏ hàng phụ kiện xe điện của bạn.',
};

export default function CartPage() {
  return (
    <section className="container mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-slate-50">Giỏ hàng</h1>

      {/*
        TODO: <CartItemList />
        - Reads from useCartStore
        - CartItem row: thumbnail, name, quantity stepper, unit price, subtotal, remove button
        - Empty state with CTA → /accessories

        TODO: <CartSummary />
        - Subtotal, shipping estimate
        - Proceed to Checkout button → /checkout
      */}
    </section>
  );
}
