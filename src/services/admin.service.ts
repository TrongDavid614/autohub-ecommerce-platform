// ─── Admin Service ────────────────────────────────────────────────────────────
import apiClient from './api-client';
import type { CarModel, CarVariant, Inventory } from '@/types/car.types';
import type { CarDeposit } from '@/types/deposit.types';
import type { TestDriveBooking } from '@/types/test-drive.types';
import type { Accessory } from '@/types/accessory.types';
import type { UserDTO } from '@/types/auth.types';
import type { PaginatedResult } from './car.service';

// ── Dashboard KPI ─────────────────────────────────────────────────────────────

export interface DashboardKPI {
  totalRevenue: number;
  revenueGrowthPercent: number;
  totalDeposits: number;
  depositConversionRate: number;   // % PAID → COMPLETED
  totalTestDrives: number;
  testDriveConfirmationRate: number;
  totalOrders: number;
  pendingDeposits: number;
  pendingTestDrives: number;
}

export interface RevenueChartDataPoint {
  period: string;  // e.g. "2025-10"
  revenue: number;
  deposits: number;
  accessories: number;
}

// ── Admin Car Management ───────────────────────────────────────────────────────

export interface CreateCarModelPayload
  extends Omit<CarModel, 'id' | 'variants' | 'createdAt' | 'updatedAt'> {}

export interface UpdateCarModelPayload extends Partial<CreateCarModelPayload> {}

// ── Admin User Management ──────────────────────────────────────────────────────

export interface AdminListUsersParams {
  role?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

// ── Service ────────────────────────────────────────────────────────────────────

export const adminService = {
  // ── Dashboard ────────────────────────────────────────────────────────────────

  async getDashboardKPIs(): Promise<DashboardKPI> {
    const { data } = await apiClient.get<DashboardKPI>('/admin/dashboard/kpis');
    return data;
  },

  async getRevenueChart(months: number = 6): Promise<RevenueChartDataPoint[]> {
    const { data } = await apiClient.get<RevenueChartDataPoint[]>(
      '/admin/dashboard/revenue',
      { params: { months } },
    );
    return data;
  },

  // ── Car Master Data ───────────────────────────────────────────────────────────

  async listAllModels(params?: {
    includeDeleted?: boolean;
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedResult<CarModel>> {
    const { data } = await apiClient.get<PaginatedResult<CarModel>>('/admin/cars', {
      params,
    });
    return data;
  },

  async createModel(payload: CreateCarModelPayload): Promise<CarModel> {
    const { data } = await apiClient.post<CarModel>('/admin/cars', payload);
    return data;
  },

  async updateModel(id: string, payload: UpdateCarModelPayload): Promise<CarModel> {
    const { data } = await apiClient.patch<CarModel>(`/admin/cars/${id}`, payload);
    return data;
  },

  /** Soft delete a car model (sets softDeleted = true). */
  async softDeleteModel(id: string): Promise<void> {
    await apiClient.delete(`/admin/cars/${id}`);
  },

  /** Restore a soft-deleted car model. */
  async restoreModel(id: string): Promise<CarModel> {
    const { data } = await apiClient.post<CarModel>(`/admin/cars/${id}/restore`);
    return data;
  },

  async addVariant(modelId: string, payload: Omit<CarVariant, 'id' | 'modelId'>): Promise<CarVariant> {
    const { data } = await apiClient.post<CarVariant>(`/admin/cars/${modelId}/variants`, payload);
    return data;
  },

  async updateInventory(
    inventoryId: string,
    stockCount: number,
  ): Promise<Inventory> {
    const { data } = await apiClient.patch<Inventory>(
      `/admin/inventory/${inventoryId}`,
      { stockCount },
    );
    return data;
  },

  // ── Deposit Management (Staff) ────────────────────────────────────────────────

  async listDeposits(params?: {
    status?: string;
    showroomId?: string;
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedResult<CarDeposit>> {
    const { data } = await apiClient.get<PaginatedResult<CarDeposit>>('/staff/deposits', {
      params,
    });
    return data;
  },

  async assignVin(depositId: string, vin: string, note?: string): Promise<CarDeposit> {
    const { data } = await apiClient.post<CarDeposit>(
      `/staff/deposits/${depositId}/assign-vin`,
      { vin, note },
    );
    return data;
  },

  async processRefund(depositId: string, approved: boolean, note?: string): Promise<CarDeposit> {
    const { data } = await apiClient.post<CarDeposit>(
      `/staff/deposits/${depositId}/process-refund`,
      { approved, note },
    );
    return data;
  },

  // ── Test Drive Management (Staff) ─────────────────────────────────────────────

  async listAllTestDrives(params?: {
    status?: string;
    showroomId?: string;
    date?: string;
  }): Promise<TestDriveBooking[]> {
    const { data } = await apiClient.get<TestDriveBooking[]>('/staff/test-drives', {
      params,
    });
    return data;
  },

  async confirmBooking(id: string, assignedStaffId: string): Promise<TestDriveBooking> {
    const { data } = await apiClient.post<TestDriveBooking>(
      `/staff/test-drives/${id}/confirm`,
      { assignedStaffId },
    );
    return data;
  },

  async completeBooking(id: string, note?: string): Promise<TestDriveBooking> {
    const { data } = await apiClient.post<TestDriveBooking>(
      `/staff/test-drives/${id}/complete`,
      { note },
    );
    return data;
  },

  // ── User Management (Admin) ───────────────────────────────────────────────────

  async listUsers(params?: AdminListUsersParams): Promise<PaginatedResult<UserDTO>> {
    const { data } = await apiClient.get<PaginatedResult<UserDTO>>('/admin/users', {
      params,
    });
    return data;
  },

  async updateUserRole(userId: string, role: string): Promise<UserDTO> {
    const { data } = await apiClient.patch<UserDTO>(`/admin/users/${userId}/role`, {
      role,
    });
    return data;
  },

  async toggleUserActive(userId: string, active: boolean): Promise<UserDTO> {
    const { data } = await apiClient.patch<UserDTO>(`/admin/users/${userId}/status`, {
      active,
    });
    return data;
  },

  // ── Accessory Management (Admin) ──────────────────────────────────────────────

  async listAllAccessories(params?: {
    includeDeleted?: boolean;
  }): Promise<PaginatedResult<Accessory>> {
    const { data } = await apiClient.get<PaginatedResult<Accessory>>('/admin/accessories', {
      params,
    });
    return data;
  },

  async createAccessory(
    payload: Omit<Accessory, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Accessory> {
    const { data } = await apiClient.post<Accessory>('/admin/accessories', payload);
    return data;
  },

  async updateAccessory(
    id: string,
    payload: Partial<Omit<Accessory, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Accessory> {
    const { data } = await apiClient.patch<Accessory>(`/admin/accessories/${id}`, payload);
    return data;
  },

  async softDeleteAccessory(id: string): Promise<void> {
    await apiClient.delete(`/admin/accessories/${id}`);
  },
};
