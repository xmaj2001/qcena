"use client";
import { cn, formatPrice } from "@/lib/utils";
import {
  BookingStatus,
  BookingStatusEnum,
  type ApiBooking,
} from "@/server/bookings/types/booking";
import { ChevronDoubleUpIcon } from "@heroicons/react/16/solid";
import { Button, Input, SortDescriptor, Table } from "@heroui/react";
import { Calendar, Check, CheckCircle, Search, XCircle } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface BookingsTableProps {
  initialBookings: ApiBooking[];
}

function SortableColumnHeader({
  children,
  sortDirection,
}: {
  children: React.ReactNode;
  sortDirection?: "ascending" | "descending";
}) {
  return (
    <span className="flex items-center justify-between">
      {children}
      {!!sortDirection && (
        <ChevronDoubleUpIcon
          className={cn(
            "size-3 transform transition-transform duration-100 ease-out",
            sortDirection === "descending" ? "rotate-180" : "",
          )}
        />
      )}
    </span>
  );
}

export function BookingsTable({ initialBookings }: BookingsTableProps) {
  const [bookings, setBookings] = useState<ApiBooking[]>(initialBookings);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "price",
    direction: "ascending",
  });
  const sortedBookings = useMemo(() => {
    return [...bookings].sort((a, b) => {
      const col = sortDescriptor.column as keyof ApiBooking;
      const first = String(a[col]);
      const second = String(b[col]);
      let cmp = first.localeCompare(second);
      if (sortDescriptor.direction === "descending") {
        cmp *= -1;
      }
      return cmp;
    });
  }, [sortDescriptor]);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todas");

  const handleUpdateStatus = (id: string, newStatus: BookingStatus) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: newStatus } : booking,
      ),
    );
    toast.success(`Status da reserva alterado para ${newStatus} com sucesso!`);
  };
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      //   booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service?.name.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeFilter === "Todas") return matchesSearch;
    return matchesSearch && booking.status === activeFilter;
  });

  return (
    <>
      <Table variant="secondary">
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Example table"
            className="min-w-[600px]"
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
          >
            <Table.Header>
              <Table.Column allowsSorting isRowHeader id="client">
                {({ sortDirection }) => (
                  <SortableColumnHeader sortDirection={sortDirection}>
                    Cliente
                  </SortableColumnHeader>
                )}
              </Table.Column>
              <Table.Column allowsSorting id="service">
                {({ sortDirection }) => (
                  <SortableColumnHeader sortDirection={sortDirection}>
                    Serviço
                  </SortableColumnHeader>
                )}
              </Table.Column>
              <Table.Column allowsSorting id="date">
                {({ sortDirection }) => (
                  <SortableColumnHeader sortDirection={sortDirection}>
                    Data
                  </SortableColumnHeader>
                )}
              </Table.Column>
              <Table.Column allowsSorting id="price">
                {({ sortDirection }) => (
                  <SortableColumnHeader sortDirection={sortDirection}>
                    Preço
                  </SortableColumnHeader>
                )}
              </Table.Column>
              <Table.Column allowsSorting id="status">
                {({ sortDirection }) => (
                  <SortableColumnHeader sortDirection={sortDirection}>
                    Estado
                  </SortableColumnHeader>
                )}
              </Table.Column>
              <Table.Column>Ações</Table.Column>
            </Table.Header>
            <Table.Body>
              {filteredBookings.map((booking) => (
                <Table.Row key={booking.id} id={booking.id}>
                  <Table.Cell>{booking.clientId}</Table.Cell>
                  <Table.Cell>
                    <Link
                      href={`/system/services/${booking.serviceId}`}
                      className="hover:underline"
                    >
                      {booking.service?.name}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="flex items-center gap-2">
                      <Calendar className="size-4 text-primary" />
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </span>
                  </Table.Cell>
                  <Table.Cell>{formatPrice(booking.totalPrice)}</Table.Cell>
                  <Table.Cell>{BookingStatusEnum[booking.status]}</Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center justify-end gap-2">
                      {booking.status === BookingStatus.PENDING && (
                        <Button
                          size="sm"
                          className="h-8 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold"
                          onClick={() =>
                            handleUpdateStatus(
                              booking.id,
                              BookingStatus.CONFIRMED,
                            )
                          }
                        >
                          <Check className="size-3.5 mr-1" />
                          Confirmar
                        </Button>
                      )}
                      {booking.status === BookingStatus.CONFIRMED && (
                        <Button
                          size="sm"
                          className="h-8 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold"
                          onClick={() =>
                            handleUpdateStatus(
                              booking.id,
                              BookingStatus.COMPLETED,
                            )
                          }
                        >
                          <CheckCircle className="size-3.5 mr-1" />
                          Concluir
                        </Button>
                      )}
                      {booking.status !== BookingStatus.COMPLETED &&
                        booking.status !== BookingStatus.CANCELED && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50"
                            onClick={() =>
                              handleUpdateStatus(
                                booking.id,
                                BookingStatus.CANCELED,
                              )
                            }
                          >
                            <XCircle className="size-3.5 mr-1" />
                            Cancelar
                          </Button>
                        )}
                      {(booking.status === BookingStatus.COMPLETED ||
                        booking.status === BookingStatus.CANCELED) && (
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                          Arquivado
                        </span>
                      )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        <Table.Footer>{/* Optional footer content */}</Table.Footer>
      </Table>
    </>
  );
}
