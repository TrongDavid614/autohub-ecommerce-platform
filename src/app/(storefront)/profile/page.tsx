// ─── Customer Profile Page ────────────────────────────────────────────────────
// Protected: ROLE_CUSTOMER required (enforced by proxy.ts)
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tài khoản của tôi | AutoHub',
  description: 'Quản lý thông tin cá nhân, địa chỉ và lịch sử giao dịch.',
};

export default function ProfilePage() {
  return (
    <section className="container mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-8 text-2xl font-bold text-slate-50">Tài khoản của tôi</h1>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Sidebar nav */}
        <nav className="lg:col-span-1">
          {/*
            TODO: <ProfileNav />
            - Links: Thông tin cá nhân, Sổ địa chỉ, Lịch sử đặt cọc, Lịch sử lái thử, Đơn phụ kiện
          */}
        </nav>

        {/* Main panel (tab-switched) */}
        <div className="lg:col-span-3 space-y-8">
          {/*
            TODO: <PersonalInfoForm />
            - fullName, phone, cccd (optional), avatarUrl

            TODO: <AddressBook />

            TODO: <DepositHistory />
            - From depositService.getMyDeposits()
            - Status badge with color: PENDING_PAYMENT=amber, PAID=sky, COMPLETED=green, REFUND_REQUESTED=orange, EXPIRED=red

            TODO: <TestDriveHistory />
            - From testDriveService.getMyBookings()

            TODO: <OrderHistory />
            - From accessoryService.getMyOrders()
          */}
        </div>
      </div>
    </section>
  );
}
