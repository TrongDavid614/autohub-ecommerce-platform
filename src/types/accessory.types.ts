// ─── Accessory & Cart / Order Types ──────────────────────────────────────────

export type OrderStatus =
  | 'PENDING_PAYMENT'
  | 'PAID'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

/** Year range that an accessory is compatible with */
export interface CompatibilityYear {
  brand: string;
  model: string;
  fromYear: number;
  toYear: number;
}

export interface Accessory {
  id: string;
  sku: string;
  name: string;
  description: string;
  /** Price in VNĐ */
  price: number;
  originalPrice?: number;
  stock: number;
  thumbnailUrl: string;
  imageUrls: string[];
  category: string;
  tags: string[];
  compatibilityYears: CompatibilityYear[];
  weight?: number;   // kg
  isPublished: boolean;
  softDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  accessory: Accessory;
  quantity: number;
  /** Unit price captured at the time the item was added */
  priceSnapshot: number;
}

export interface Cart {
  items: CartItem[];
  /** ISO8601 – for expiry / staleness checks */
  updatedAt: string;
}

export interface OrderItem {
  accessory: Accessory;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: string;
  orderCode: string;
  customerId: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  status: OrderStatus;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  vnpayTxnRef?: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShippingAddress {
  recipientName: string;
  phone: string;
  street: string;
  ward: string;
  district: string;
  province: string;
}

export interface AccessoryFilterParams {
  category?: string;
  brand?: string;
  compatibleModel?: string;
  compatibleYear?: number;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  pageSize?: number;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'popular';
}
