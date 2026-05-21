import { ApiBooking, BookingStatus } from "@/server/bookings/types/booking";
import { Card, CardContent } from "@heroui/react";

interface DashboardCardsProps {
  bookings: ApiBooking[];
}

export function DashboardCards({ bookings }: DashboardCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="border-neutral-100 dark:border-neutral-800/80 shadow-xs">
        <CardContent className="p-4 flex flex-col items-center justify-center">
          <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
            Pendentes
          </p>
          <p className="font-extrabold text-2xl text-amber-500 mt-1">
            {bookings.filter((b) => b.status === BookingStatus.PENDING).length}
          </p>
        </CardContent>
      </Card>
      <Card className="border-neutral-100 dark:border-neutral-800/80 shadow-xs">
        <CardContent className="p-4 flex flex-col items-center justify-center">
          <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
            Confirmadas
          </p>
          <p className="font-extrabold text-2xl text-emerald-500 mt-1">
            {
              bookings.filter((b) => b.status === BookingStatus.CONFIRMED)
                .length
            }
          </p>
        </CardContent>
      </Card>
      <Card className="border-neutral-100 dark:border-neutral-800/80 shadow-xs">
        <CardContent className="p-4 flex flex-col items-center justify-center">
          <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
            Concluídas
          </p>
          <p className="font-extrabold text-2xl text-indigo-500 mt-1">
            {
              bookings.filter((b) => b.status === BookingStatus.COMPLETED)
                .length
            }
          </p>
        </CardContent>
      </Card>
      <Card className="border-neutral-100 dark:border-neutral-800/80 shadow-xs">
        <CardContent className="p-4 flex flex-col items-center justify-center">
          <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
            Canceladas
          </p>
          <p className="font-extrabold text-2xl text-red-500 mt-1">
            {bookings.filter((b) => b.status === BookingStatus.CANCELED).length}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
