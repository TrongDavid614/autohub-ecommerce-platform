// ─── Test Drive Zod Schema ────────────────────────────────────────────────────
import { z } from 'zod';

/** Minimum advance notice before a test drive can be booked (hours) */
const MIN_ADVANCE_HOURS = 24;

export const testDriveSchema = z.object({
  /** Target showroom */
  showroomId: z
    .string()
    .min(1, 'Vui lòng chọn showroom'),

  /** Desired car variant */
  variantId: z
    .string()
    .min(1, 'Vui lòng chọn phiên bản xe'),

  /**
   * Scheduled date-time (ISO8601).
   * Must be at least 24 hours from now.
   */
  scheduledAt: z
    .string()
    .min(1, 'Vui lòng chọn thời gian lái thử')
    .refine(
      (val) => {
        const scheduled = new Date(val);
        const minAllowed = new Date(Date.now() + MIN_ADVANCE_HOURS * 60 * 60 * 1000);
        return scheduled >= minAllowed;
      },
      {
        message: `Thời gian đặt lịch phải trước ít nhất ${MIN_ADVANCE_HOURS} tiếng so với hiện tại`,
      },
    ),

  /**
   * Customer must acknowledge they hold a valid driver's license.
   * Must be literally `true` – any other value (including false or undefined) fails.
   */
  camKetGPLX: z.literal(true, {
    message: 'Bạn phải xác nhận có giấy phép lái xe hợp lệ để đặt lịch lái thử',
  }),

  /** Optional note from the customer */
  note: z
    .string()
    .max(500, 'Ghi chú không vượt quá 500 ký tự')
    .optional(),
});

export type TestDriveFormValues = z.infer<typeof testDriveSchema>;
