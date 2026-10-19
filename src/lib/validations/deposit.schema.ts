// ─── Deposit Zod Schema ───────────────────────────────────────────────────────
import { z } from 'zod';

/**
 * Valid Vietnamese mobile phone prefixes (as of 2024).
 * Covers Viettel, Mobifone, Vinaphone, Vietnamobile, Gmobile, Reddi.
 */
const VN_PHONE_PREFIXES = [
  // Viettel
  '032', '033', '034', '035', '036', '037', '038', '039',
  '086', '096', '097', '098',
  // Mobifone
  '070', '079', '077', '076', '078', '089', '090', '093',
  // Vinaphone
  '081', '082', '083', '084', '085', '088', '091', '094',
  // Vietnamobile
  '052', '058', '092',
  // Gmobile
  '059', '099',
  // Reddi (ex-GTel)
  '055', '056',
];

const vnPhoneRegex = new RegExp(
  `^(${VN_PHONE_PREFIXES.map((p) => p.replace(/\d/g, (d) => d)).join('|')})\\d{7}$`,
);

export const depositSchema = z.object({
  /** Buyer's legal full name (must match CCCD) */
  buyerFullName: z
    .string()
    .trim()
    .min(2, 'Họ tên phải có ít nhất 2 ký tự')
    .max(100, 'Họ tên không vượt quá 100 ký tự'),

  /** 12-digit Vietnamese CCCD number */
  buyerCccd: z
    .string()
    .trim()
    .regex(/^\d{12}$/, 'Số CCCD phải gồm đúng 12 chữ số'),

  /** 10-digit Vietnamese mobile number with valid prefix */
  buyerPhone: z
    .string()
    .trim()
    .regex(vnPhoneRegex, 'Số điện thoại không hợp lệ (phải là số di động Việt Nam 10 chữ số)'),

  /** Selected showroom ID */
  showroomId: z
    .string()
    .min(1, 'Vui lòng chọn showroom'),

  /** Color name from the available options */
  colorName: z
    .string()
    .min(1, 'Vui lòng chọn màu xe'),

  /** Deposit amount: 10,000,000 or 20,000,000 VNĐ */
  amount: z.union([z.literal(10_000_000), z.literal(20_000_000)], {
    message: 'Số tiền cọc không hợp lệ',
  }),
});

export type DepositFormValues = z.infer<typeof depositSchema>;
