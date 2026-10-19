// ─── Deposit Service ──────────────────────────────────────────────────────────
import apiClient from './api-client';
import type {
  CarDeposit,
  CreateDepositRequest,
  VNPayReturnParams,
} from '@/types/deposit.types';

const DEPOSIT_PREFIX = '/deposits';

export interface VNPayInitResponse {
  paymentUrl: string;
  txnRef: string;
}

export const depositService = {
  /**
   * Create a new deposit record and receive the VNPay payment URL.
   */
  async createDeposit(payload: CreateDepositRequest): Promise<VNPayInitResponse> {
    const { data } = await apiClient.post<VNPayInitResponse>(DEPOSIT_PREFIX, payload);
    return data;
  },

  /**
   * Verify VNPay IPN / return parameters and confirm payment status.
   */
  async verifyPayment(params: VNPayReturnParams): Promise<CarDeposit> {
    const { data } = await apiClient.post<CarDeposit>(`${DEPOSIT_PREFIX}/verify`, params);
    return data;
  },

  /**
   * Fetch a single deposit by ID (customer can only see their own).
   */
  async getDeposit(id: string): Promise<CarDeposit> {
    const { data } = await apiClient.get<CarDeposit>(`${DEPOSIT_PREFIX}/${id}`);
    return data;
  },

  /**
   * List all deposits belonging to the current customer.
   */
  async getMyDeposits(): Promise<CarDeposit[]> {
    const { data } = await apiClient.get<CarDeposit[]>(`${DEPOSIT_PREFIX}/my`);
    return data;
  },

  /**
   * Request a refund for an eligible deposit.
   */
  async requestRefund(id: string, reason: string): Promise<CarDeposit> {
    const { data } = await apiClient.post<CarDeposit>(`${DEPOSIT_PREFIX}/${id}/refund`, {
      reason,
    });
    return data;
  },
};
