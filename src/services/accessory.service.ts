// ─── Accessory Service ────────────────────────────────────────────────────────
import apiClient from './api-client';
import type {
  Accessory,
  Cart,
  Order,
  CartItem,
  ShippingAddress,
  AccessoryFilterParams,
} from '@/types/accessory.types';
import type { PaginatedResult } from './car.service';

const ACCESSORY_PREFIX = '/accessories';
const ORDERS_PREFIX = '/orders';

export const accessoryService = {
  /**
   * List accessories with optional filter & pagination.
   */
  async listAccessories(params?: AccessoryFilterParams): Promise<PaginatedResult<Accessory>> {
    const { data } = await apiClient.get<PaginatedResult<Accessory>>(ACCESSORY_PREFIX, {
      params,
    });
    return data;
  },

  /**
   * Fetch a single accessory by ID.
   */
  async getAccessory(id: string): Promise<Accessory> {
    const { data } = await apiClient.get<Accessory>(`${ACCESSORY_PREFIX}/${id}`);
    return data;
  },

  /**
   * Merge the local guest cart into the authenticated user's server cart.
   * Returns the merged cart from server.
   */
  async mergeCarts(guestItems: CartItem[]): Promise<Cart> {
    const { data } = await apiClient.post<Cart>('/cart/merge', { items: guestItems });
    return data;
  },

  /**
   * Fetch the authenticated user's server-side cart.
   */
  async getServerCart(): Promise<Cart> {
    const { data } = await apiClient.get<Cart>('/cart');
    return data;
  },

  /**
   * Create an order from the current cart + shipping address.
   * Returns the created order with VNPay payment URL.
   */
  async checkout(payload: {
    shippingAddress: ShippingAddress;
    note?: string;
  }): Promise<{ order: Order; paymentUrl: string }> {
    const { data } = await apiClient.post<{ order: Order; paymentUrl: string }>(
      `${ORDERS_PREFIX}/checkout`,
      payload,
    );
    return data;
  },

  /**
   * Fetch all orders for the authenticated customer.
   */
  async getMyOrders(): Promise<Order[]> {
    const { data } = await apiClient.get<Order[]>(`${ORDERS_PREFIX}/my`);
    return data;
  },

  /**
   * Fetch a single order by ID.
   */
  async getOrder(id: string): Promise<Order> {
    const { data } = await apiClient.get<Order>(`${ORDERS_PREFIX}/${id}`);
    return data;
  },
};
