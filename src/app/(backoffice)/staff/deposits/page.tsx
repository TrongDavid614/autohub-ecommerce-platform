// ─── Staff Deposits Reconciliation Page ──────────────────────────────────────
// Protected: ROLE_STAFF and ROLE_ADMIN (enforced by proxy.ts)
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quản lý đặt cọc | AutoHub Staff',
  description: 'Đối soát đặt cọc đã thanh toán và gán số khung VIN thực tế.',
};

type SearchParams = Promise<{
  status?: string;
  showroomId?: string;
  page?: string;
}>;

export default async function StaffDepositsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { status, showroomId, page } = await searchParams;

  // Status filter tabs
  const statusTabs = [
    { value: '',                  label: 'Tất cả' },
    { value: 'PENDING_PAYMENT',   label: 'Chờ thanh toán' },
    { value: 'PAID',              label: 'Đã cọc ✅' },
    { value: 'EXPIRED',           label: 'Hết hạn' },
    { value: 'REFUND_REQUESTED',  label: 'Yêu cầu hoàn cọc' },
    { value: 'COMPLETED',         label: 'Hoàn tất' },
  ] as const;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-50">Quản lý đặt cọc</h1>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2">
        {statusTabs.map((tab) => (
          <a
            key={tab.value}
            href={`?status=${tab.value}&showroomId=${showroomId ?? ''}&page=1`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              status === tab.value || (!status && !tab.value)
                ? 'bg-sky-500 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {tab.label}
          </a>
        ))}
      </div>

      {/*
        TODO: <DepositReconciliationTable
          status={status}
          showroomId={showroomId}
          page={Number(page ?? 1)}
        />
        Columns: Mã đặt cọc | Khách hàng | Xe | Màu | Showroom | Tiền cọc | Trạng thái | VIN | Thao tác
        Actions for PAID rows: Assign VIN → opens modal with <AssignVinForm />
        Actions for REFUND_REQUESTED rows: Approve / Reject refund → <ProcessRefundModal />
      */}

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-sm text-slate-400">
        Bảng đối soát đặt cọc sẽ hiển thị ở đây.
        <br />
        <code className="text-xs">status={status} showroomId={showroomId} page={page}</code>
      </div>
    </div>
  );
}
