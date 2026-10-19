// ─── Car Service ──────────────────────────────────────────────────────────────
import apiClient from './api-client';
import type {
  CarModel,
  CarVariant,
  Inventory,
  CarFilterParams,
  OnRoadCostEstimate,
} from '@/types/car.types';

const CARS_PREFIX = '/cars';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const carService = {
  /**
   * List published car models with optional filters and pagination.
   */
  async listModels(params?: CarFilterParams): Promise<PaginatedResult<CarModel>> {
    const { data } = await apiClient.get<PaginatedResult<CarModel>>(CARS_PREFIX, { params });
    return data;
  },

  /**
   * Fetch a single car model with all its variants.
   */
  async getModel(id: string): Promise<CarModel> {
    const { data } = await apiClient.get<CarModel>(`${CARS_PREFIX}/${id}`);
    return data;
  },

  /**
   * Fetch a specific car variant by its ID.
   */
  async getVariant(variantId: string): Promise<CarVariant> {
    const { data } = await apiClient.get<CarVariant>(`${CARS_PREFIX}/variants/${variantId}`);
    return data;
  },

  /**
   * Fetch real-time inventory for a given variant across all showrooms.
   */
  async getInventory(variantId: string): Promise<Inventory[]> {
    const { data } = await apiClient.get<Inventory[]>(
      `${CARS_PREFIX}/variants/${variantId}/inventory`,
    );
    return data;
  },

  /**
   * Fetch multiple variants for the comparison matrix (max 3).
   */
  async compareVariants(variantIds: string[]): Promise<CarVariant[]> {
    const { data } = await apiClient.get<CarVariant[]>(`${CARS_PREFIX}/compare`, {
      params: { ids: variantIds.join(',') },
    });
    return data;
  },

  /**
   * Calculate on-road cost for a variant in a given province.
   */
  async estimateOnRoadCost(
    variantId: string,
    province: string,
  ): Promise<OnRoadCostEstimate> {
    const { data } = await apiClient.get<OnRoadCostEstimate>(
      `${CARS_PREFIX}/variants/${variantId}/cost-estimate`,
      { params: { province } },
    );
    return data;
  },

  /**
   * List all available provinces for on-road cost calculation.
   */
  async listProvinces(): Promise<string[]> {
    const { data } = await apiClient.get<string[]>('/provinces');
    return data;
  },
};
