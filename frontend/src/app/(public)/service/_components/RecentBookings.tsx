"use client";
import {
  Avatar,
  Button,
  Card,
  Chip,
  Disclosure,
  Separator,
  Table,
} from "@heroui/react";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import {
  BookingStatusEnum,
  type ApiBooking,
} from "@/server/bookings/types/booking";
import { getBookingsService } from "@/server/bookings/features/get-booking-service.feat";
import { formatNumber, formatPrice } from "@/lib/utils";
import { useState } from "react";

interface RecentBookingsProps {
  data: ApiBooking[];
}

export function RecentBookings({ data }: RecentBookingsProps) {
  const [open, setOpen] = useState(false);
  return (
    <Disclosure isExpanded={open} onExpandedChange={setOpen}>
      <Disclosure.Heading>
        <Button slot="trigger" variant="ghost">
          <UserGroupIcon className="size-4" />
          Reservas recentes
          <Disclosure.Indicator />
        </Button>
      </Disclosure.Heading>
      <Disclosure.Content>
        <RecentBookingsTables data={data} />
      </Disclosure.Content>
    </Disclosure>
  );
}

export function RecentBookingsTables({ data }: { data: ApiBooking[] }) {
  return (
    <div className="flex flex-col gap-2">
      <Table variant="primary">
        <Table.ScrollContainer>
          <Table.Content>
            <Table.Header>
              <Table.Column isRowHeader>Date</Table.Column>
              <Table.Column>Total</Table.Column>
              <Table.Column>Status</Table.Column>
            </Table.Header>
            <Table.Body>
              {data.map((booking) => (
                <Table.Row key={booking.id}>
                  <Table.Cell>
                    <Chip size="sm" color="default" variant="soft">
                      <Chip.Label>
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </Chip.Label>
                    </Chip>
                  </Table.Cell>

                  <Table.Cell>
                    <Chip size="sm" color="default" variant="soft">
                      <Chip.Label>{formatPrice(booking.totalPrice)}</Chip.Label>
                    </Chip>
                  </Table.Cell>
                  <Table.Cell>
                    <Chip
                      size="sm"
                      color={
                        booking.status === "CONFIRMED" ? "success" : "warning"
                      }
                      variant="soft"
                    >
                      <Chip.Label>
                        {BookingStatusEnum[booking.status]}
                      </Chip.Label>
                    </Chip>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}
