import { Gallery } from "@/components/services/gallery";
import { RelatedServices } from "@/components/services/RelatedServices";
import { ServiceDescription } from "@/components/services/service-description";
import { ServiceNavbar } from "@/components/services/service-navbar";
import { getService } from "@/server/services/features/get-service.feat";
import { Suspense } from "react";
import { HeroService } from "@/components/services/hero-service";
import { ServiceProvedor } from "../_components/ServiceProvedor";
import { TopClientes } from "../_components/TopClientes";
import { RecentBookings } from "../_components/RecentBookings";
import { getServerSession } from "@/lib/auth/auth-session";
import { ApiBooking } from "@/server/bookings/types/booking";
import { getBookingsService } from "@/server/bookings/features/get-booking-service.feat";

interface ServicePageProps {
  params: Promise<{ id: string }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { id } = await params;
  const [service, session] = await Promise.all([
    getService(id),
    getServerSession(),
  ]);

  let isProvider: boolean = false;
  let isClient: boolean = false;
  let booking: ApiBooking[] = [];

  if (!service) return <div>Service not found</div>;

  if (session?.success) {
    isProvider = session.data?.user.id === service.provider.id;
    isClient = !isProvider;
    booking = (await getBookingsService(id)).data;
  }
  return (
    <div className="min-h-screen text-white relative pt-20" id="place">
      <ServiceNavbar />
      <div className="mx-auto max-w-(--breakpoint-2xl) px-4">
        <div className="flex flex-col rounded-lg bg-white p-8 md:p-12 lg:flex-row lg:gap-8  dark:bg-black">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Suspense fallback={null}>
              <HeroService service={service} />
            </Suspense>

            <div className="flex flex-col gap-4 px-4">
              {/* Provedor */}
              <ServiceProvedor service={service} />

              {/* Top Clientes */}
              {isProvider && service.topClients.length > 0 && (
                <TopClientes service={service} />
              )}
              {/* Recent Bookings */}
              {isClient && (
                <Suspense fallback={null}>
                  <RecentBookings data={booking} />
                </Suspense>
              )}
            </div>
          </div>

          <div className="basis-full lg:basis-2/6">
            <Suspense fallback={null}>
              <ServiceDescription service={service} />
            </Suspense>
          </div>
        </div>
        <RelatedServices id={service.id} />
      </div>
    </div>
  );
}
