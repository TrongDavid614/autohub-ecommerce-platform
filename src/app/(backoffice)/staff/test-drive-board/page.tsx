// ─── Staff Test Drive Board Page ──────────────────────────────────────────────
// Protected: ROLE_STAFF and ROLE_ADMIN (enforced by proxy.ts)
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bảng lái thử | AutoHub Staff',
  description: 'Kanban điều phối lịch lái thử xe điện cho nhân viên showroom.',
};

type SearchParams = Promise<{
  showroomId?: string;
  date?: string;
}>;

export default async function StaffTestDriveBoardPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { showroomId, date } = await searchParams;

  // Kanban columns matching BookingStatus
  const columns = [
    { status: 'PENDING',   label: '🕐 Chờ xác nhận', color: 'border-amber-500' },
    { status: 'CONFIRMED', label: '✅ Đã xác nhận',   color: 'border-sky-500' },
    { status: 'COMPLETED', label: '🏁 Hoàn thành',    color: 'border-green-500' },
    { status: 'EXPIRED',   label: '⏰ Hết hạn',       color: 'border-slate-600' },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-50">Bảng điều phối lái thử</h1>
        {/* TODO: <ShowroomDateFilter showroomId={showroomId} date={date} /> */}
      </div>

      {/*
        TODO: Fetch bookings from adminService.listAllTestDrives({ showroomId, date })
        and bucket them by status into Kanban columns below.
      */}

      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((col) => (
          <div
            key={col.status}
            className={`flex min-w-72 flex-col rounded-xl border-t-4 bg-slate-900 p-4 ${col.color}`}
          >
            <h2 className="mb-3 text-sm font-semibold text-slate-300">{col.label}</h2>
            {/*
              TODO: <TestDriveKanbanColumn
                status={col.status}
                bookings={bookingsByStatus[col.status]}
                onConfirm={handleConfirm}
                onComplete={handleComplete}
              />
            */}
            <p className="text-xs text-slate-500">Không có lịch</p>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-500">
        Showroom: {showroomId ?? 'tất cả'} · Ngày: {date ?? 'hôm nay'}
      </p>
    </div>
  );
}
