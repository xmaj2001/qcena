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
  const queryParams = new URLSearchParams();
  if (params) {
    // if (params.cursor) {
    //   url.append("cursor", params.cursor);
    // }
    // if (params.limit !== undefined) {
    //   url.append("limit", params.limit.toString());
    // }
    // if (params.status) {
    //   url.append("status", params.status);
    // }
    if (params.search) {
      queryParams.append("search", params.search);
    }
  }

  const queryString = queryParams.toString();
  const url = `/api/bookings${queryString ? `?${queryString}` : ""}`;
  console.log(url);
  const response =
    await apiFetch<ApiEnvelope<ApiCursorEnvelope<ApiBooking>>>(url);

  return response;
}
