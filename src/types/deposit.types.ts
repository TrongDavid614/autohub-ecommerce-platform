// ─── Car Deposit Types ────────────────────────────────────────────────────────
import type { CarVariant, CarColor, Showroom } from './car.types';
import type { UserDTO } from './auth.types';

export type DepositStatus =
  | 'PENDING_PAYMENT'
  | 'PAID'
  | 'EXPIRED'
  | 'REFUND_REQUESTED'
  | 'COMPLETED';

/** Fixed deposit amounts in VNĐ */
export type DepositAmount = 10_000_000 | 20_000_000;

/** Duration the variant is locked after successful payment (hours) */
export const DEPOSIT_LOCK_DURATION_HOURS = 72 as const;

export interface CarDeposit {
  id: string;
  depositCode: string;
  customer: UserDTO;
  variant: CarVariant;
  color: CarColor;
  showroom: Showroom;
  amount: DepositAmount;
  status: DepositStatus;
  /** Full name on legal document */
  buyerFullName: string;
  /** 12-digit CCCD */
  buyerCccd: string;
  buyerPhone: string;
  /** VNPay transaction reference */
  vnpayTxnRef?: string;
  /** ISO8601 – when payment was confirmed */
  paidAt?: string;
  /** ISO8601 – when the 72h lock expires */
  lockedUntil?: string;
  /** VIN assigned by staff after physical inspection */
  assignedVin?: string;
  /** Staff note on completion / refund reason */
  staffNote?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDepositRequest {
  variantId: string;
  colorName: string;
  showroomId: string;
  amount: DepositAmount;
  buyerFullName: string;
  buyerCccd: string;
  buyerPhone: string;
}

export interface VNPayReturnParams {
  vnp_Amount: string;
  vnp_BankCode: string;
  vnp_OrderInfo: string;
  vnp_ResponseCode: string;
  vnp_TxnRef: string;
  vnp_SecureHash: string;
  [key: string]: string;
}
