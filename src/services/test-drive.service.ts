// ─── Test Drive Service ───────────────────────────────────────────────────────
import apiClient from './api-client';
import type {
  TestDriveBooking,
  CreateTestDriveRequest,
  TimeSlot,
  DemoCar,
} from '@/types/test-drive.types';

const TEST_DRIVE_PREFIX = '/test-drives';

export const testDriveService = {
  /**
   * Fetch available time slots for a given showroom and date.
   * @param showroomId - Target showroom ID
   * @param date - ISO8601 date string (YYYY-MM-DD)
   */
  async getAvailableSlots(showroomId: string, date: string): Promise<TimeSlot[]> {
    const { data } = await apiClient.get<TimeSlot[]>(`${TEST_DRIVE_PREFIX}/slots`, {
      params: { showroomId, date },
    });
    return data;
  },

  /**
   * Fetch available demo cars for a given showroom.
   */
  async getDemoCars(showroomId: string): Promise<DemoCar[]> {
    const { data } = await apiClient.get<DemoCar[]>(`${TEST_DRIVE_PREFIX}/demo-cars`, {
      params: { showroomId },
    });
    return data;
  },

  /**
   * Create a new test drive booking.
   * The scheduledAt must be at least 24 hours in the future.
   */
  async createBooking(payload: CreateTestDriveRequest): Promise<TestDriveBooking> {
    const { data } = await apiClient.post<TestDriveBooking>(TEST_DRIVE_PREFIX, payload);
    return data;
  },

  /**
   * Fetch all test drive bookings for the current customer.
   */
  async getMyBookings(): Promise<TestDriveBooking[]> {
    const { data } = await apiClient.get<TestDriveBooking[]>(`${TEST_DRIVE_PREFIX}/my`);
    return data;
  },

  /**
   * Fetch a single booking by ID.
   */
  async getBooking(id: string): Promise<TestDriveBooking> {
    const { data } = await apiClient.get<TestDriveBooking>(`${TEST_DRIVE_PREFIX}/${id}`);
    return data;
  },

  /**
   * Cancel a booking (customer self-service, before it's confirmed).
   */
  async cancelBooking(id: string): Promise<TestDriveBooking> {
    const { data } = await apiClient.post<TestDriveBooking>(
      `${TEST_DRIVE_PREFIX}/${id}/cancel`,
    );
    return data;
  },
};
