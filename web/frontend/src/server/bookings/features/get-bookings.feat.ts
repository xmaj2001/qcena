import { apiFetch } from "@/server/apiFetch";
import type { ApiEnvelope, ApiCursorEnvelope } from "@/types/api.types";
import type { ApiBooking, BookingStatus } from "../types/booking";

interface GetBookingsParams {
  cursor?: string;
  limit?: number;
  status?: BookingStatus;
  search?: string;
}

export async function getBookings(
  params?: GetBookingsParams,
): Promise<ApiEnvelope<ApiCursorEnvelope<ApiBooking>>> {
  const url = new URLSearchParams();
  if (params) {
    if (params.cursor) {
      url.set("cursor", params.cursor);
    }
    if (params.limit !== undefined) {
      url.set("limit", params.limit.toString());
    }
    if (params.status) {
      url.set("status", params.status);
    }
    if (params.search) {
      url.set("search", params.search);
    }
  }
  const response = await apiFetch<ApiEnvelope<ApiCursorEnvelope<ApiBooking>>>(
    `/api/bookings?${url.toString()}`,
  );

  return response;
}
