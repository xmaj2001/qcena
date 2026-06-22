import { toast } from "sonner";
import { Calendar } from "lucide-react";
import { DashboardHeader } from "../../../../components/dashboard/header";
import { SiteHeader } from "@/components/site-header";
import { BookingsTable } from "@/components/bookings/table";
import { ApiBooking } from "@/server/bookings/types/booking";
import { getBookings } from "@/server/bookings/features/get-bookings.feat";
import { ApiError } from "next/dist/server/api-utils";
import Search from "@/components/search/search";

interface SearchPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}
export default async function BookingsPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const {
    sort,
    q: searchValue,
    cursor,
  } = (params ?? {}) as { [key: string]: string };
  let bookings: ApiBooking[] = [];

  console.log(searchValue, cursor);
  const res = await getBookings({
    search: searchValue,
    cursor,
    limit: 9,
  });
  if (!res.success) {
    if (res instanceof ApiError) {
      toast.error(res.message);
    }
    return;
  }

  bookings = res.data.items;
  return (
    <>
      <SiteHeader title="Reservas" />
      <div className="flex flex-col gap-8 p-6 md:p-8 lg:p-10 bg-neutral-50/50 dark:bg-neutral-950/20 min-h-screen">
        {/* Header banner */}
        <DashboardHeader
          title="Reservas de Clientes"
          subtitle="Agenda & Reservas"
          description="Controle os agendamentos de seus clientes. Confirme novos pedidos,
            conclua serviços finalizados e cancele sessões se necessário."
          icon={<Calendar className="h-5 w-5 text-primary" />}
        />

        {/* Grid count cards */}

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Center Area: Search on search page, Nav Links elsewhere */}
          <div className="relative w-full max-w-md mx-4">
            <Search action="/system/bookings" />
          </div>

          {/* Filter tags group */}
          {/* <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {["Todas", ...Object.values(BookingStatus)].map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "primary" : "outline"}
                className="rounded-xl text-xs font-semibold h-9 px-4 duration-200"
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div> */}
        </div>
        {/* Bookings table list */}
        <BookingsTable initialBookings={bookings} />
      </div>
    </>
  );
}
