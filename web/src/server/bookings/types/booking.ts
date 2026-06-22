export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELED = "CANCELED",
  COMPLETED = "COMPLETED",
}

export interface ApiBooking {
  id: string;
  serviceId: string;
  clientId: string;
  scheduledAt: string | Date;
  totalPrice: number;
  status: BookingStatus;
  service: {
    image: string;
    name: string;
  };
  createdAt: string | Date;
  updatedAt: string | Date;
}

export const BookingStatusEnum = {
  [BookingStatus.PENDING]: "Pendente",
  [BookingStatus.CONFIRMED]: "Confirmado",
  [BookingStatus.CANCELED]: "Cancelado",
  [BookingStatus.COMPLETED]: "Concluído",
};

export type BookingStatusLabelEnum =
  (typeof BookingStatusEnum)[keyof typeof BookingStatusEnum];
