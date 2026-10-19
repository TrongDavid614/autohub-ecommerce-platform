// ─── Test Drive Booking Page ──────────────────────────────────────────────────
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đặt lịch lái thử | AutoHub',
  description: 'Đặt lịch lái thử xe điện tại showroom AutoHub gần nhất.',
};

type SearchParams = Promise<{
  variantId?: string;
  showroomId?: string;
}>;

export default async function TestDrivePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { variantId, showroomId } = await searchParams;

  return (
    <section className="container mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-2 text-2xl font-bold text-slate-50">Đặt lịch lái thử</h1>
      <p className="mb-8 text-sm text-slate-400">
        Lịch phải đặt trước ít nhất{' '}
        <span className="font-semibold text-sky-400">24 tiếng</span>. Vui lòng chuẩn bị GPLX hợp lệ.
      </p>

      {/*
        TODO: <TestDriveBookingForm defaultVariantId={variantId} defaultShowroomId={showroomId} />
        - react-hook-form + zodResolver(testDriveSchema)
        - Fields: variantId, showroomId, scheduledAt (date-time picker), camKetGPLX (checkbox), note
        - Time slot grid from testDriveService.getAvailableSlots()
        - Submit → testDriveService.createBooking() → success toast + redirect /profile
      */}
    </section>
  );
}
