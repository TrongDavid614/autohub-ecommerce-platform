// ─── Test Drive Types ─────────────────────────────────────────────────────────
import type { CarVariant, Showroom } from './car.types';
import type { UserDTO } from './auth.types';

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'EXPIRED';

export interface DemoCar {
  id: string;
  variant: CarVariant;
  licensePlate: string;
  showroom: Showroom;
  isAvailable: boolean;
  notes?: string;
}

export interface TimeSlot {
  id: string;
  startTime: string; // ISO8601
  endTime: string;   // ISO8601
  isAvailable: boolean;
  demoCarId?: string;
}

export interface TestDriveBooking {
  id: string;
  bookingCode: string;
  customer: UserDTO;
  demoCar: DemoCar;
  showroom: Showroom;
  scheduledAt: string;   // ISO8601 – must be ≥24h from submission
  status: BookingStatus;
  /** Customer confirmed they hold a valid driver's license */
  camKetGPLX: boolean;
  staffNote?: string;
  /** Staff member assigned to accompany the test drive */
  assignedStaffId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTestDriveRequest {
  variantId: string;
  showroomId: string;
  scheduledAt: string; // ISO8601 – validated ≥24h in advance server-side too
  camKetGPLX: true;   // must be literally true
  note?: string;
}

export interface TestDriveBoardColumn {
  status: BookingStatus;
  label: string;
  bookings: TestDriveBooking[];
}
