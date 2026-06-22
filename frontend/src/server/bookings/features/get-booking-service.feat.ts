import { apiFetch } from "@/server/apiFetch";
import type { ApiEnvelope } from "@/types/api.types";
import type { ApiBooking } from "../types/booking";

export async function getBookingsService(serviceId: string) {
  const response = await apiFetch<ApiEnvelope<ApiBooking[]>>(
    `/api/bookings/service/${serviceId}`,
  );

  return response;
}
