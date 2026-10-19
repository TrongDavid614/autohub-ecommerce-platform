// ─── Car / Vehicle Types ─────────────────────────────────────────────────────

export interface TechnicalSpecs {
  batteryCapacity: number;   // kWh
  range: number;             // km (WLTP)
  power: number;             // kW
  torque: number;            // Nm
  acceleration0to100: number; // seconds
  topSpeed: number;          // km/h
  chargingSpeed: number;     // kW (max DC)
  driveType: 'FWD' | 'RWD' | 'AWD';
  seatingCapacity: number;
  cargoCapacity: number;     // litres
}

export type CarColor = {
  name: string;
  hexCode: string;
  imageUrl: string;
};

export interface CarVariant {
  id: string;
  modelId: string;
  name: string;
  /** Trimmed variant (e.g. "Standard Range", "Long Range") */
  trim: string;
  /** Base MSRP in VND */
  basePrice: number;
  specs: TechnicalSpecs;
  availableColors: CarColor[];
  thumbnailUrl: string;
  gallery360Url?: string;
}

export interface CarModel {
  id: string;
  brand: string;
  model: string;
  year: number;
  segment: 'SEDAN' | 'SUV' | 'HATCHBACK' | 'PICKUP' | 'VAN';
  description: string;
  variants: CarVariant[];
  /** Promotional badge e.g. "New", "Best Seller" */
  badge?: string;
  isPublished: boolean;
  softDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ShowroomId = string;

export interface Showroom {
  id: ShowroomId;
  name: string;
  province: string;
  address: string;
  phone: string;
  coordinates: { lat: number; lng: number };
}

export interface Inventory {
  id: string;
  variant: CarVariant;
  color: CarColor;
  showroom: Showroom;
  vin?: string;
  /** Units physically in stock */
  stockCount: number;
  /** Units reserved by active deposits */
  reservedCount: number;
  updatedAt: string;
}

export interface CarFilterParams {
  brand?: string;
  segment?: CarModel['segment'];
  minPrice?: number;
  maxPrice?: number;
  minRange?: number;
  year?: number;
  page?: number;
  pageSize?: number;
  sort?: 'price_asc' | 'price_desc' | 'newest';
}

/** On-road cost per province */
export interface OnRoadCostEstimate {
  variantId: string;
  province: string;
  basePrice: number;
  registrationFee: number;
  registrationTax: number;
  vat: number;
  insuranceFee: number;
  licensePlateFee: number;
  total: number;
}
