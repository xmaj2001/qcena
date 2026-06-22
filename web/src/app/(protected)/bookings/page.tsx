import { getServerSession } from "@/lib/auth/auth-session";
import { getBookings } from "@/server/bookings/features/get-bookings.feat";
import { SearchNavbar } from "@/components/search/search-navbar";
import { Footer } from "@/components/footer";
import { InfiniteBookingsGrid } from "@/components/bookings/infinite-bookings-grid";
import { ApiBooking } from "@/server/bookings/types/booking";
import Link from "next/link";
import { Button } from "@heroui/react";
import { CalendarRange, Lock } from "lucide-react";

export const metadata = {
  title: "Qcena - Minhas Reservas",
  description: "Gerencie e visualize suas reservas de serviços na Qcena.",
};

export default async function BookingsPage() {
  const sessionEnvelope = await getServerSession();
  const session = sessionEnvelope?.data;

  // Initial fetch if user is logged in
  let initialBookings: ApiBooking[] = [];
  let initialNextCursor: string | null = null;

  if (session?.user) {
    try {
      const bookingsResponse = await getBookings({ limit: 9 });
      if (bookingsResponse.success && bookingsResponse.data) {
        initialBookings = bookingsResponse.data.items;
        initialNextCursor = bookingsResponse.data.nextCursor;
      }
    } catch (e) {
      console.error("Erro ao carregar reservas iniciais no servidor:", e);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-black text-neutral-900 dark:text-neutral-100 relative pt-28">
      {/* Navigation Navbar */}
      <SearchNavbar />

      {/* Main Container */}
      <main className="flex-1 flex flex-col pb-20">
        {/* Banner Section */}
        <div className="relative py-12 md:py-16 mb-8 overflow-hidden bg-radial from-neutral-900 via-black to-neutral-900 text-white border-b border-neutral-800/80">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(var(--primary-rgb),0.08),transparent_50%)]" />
          <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 rounded-2xl bg-primary/20 border border-primary/20 text-primary">
                <CalendarRange className="h-6 w-6" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
                Minhas Reservas
              </h1>
            </div>
            <p className="text-sm text-neutral-400 max-w-xl">
              Gerencie seus agendamentos, visualize o status atual dos seus pedidos e explore os detalhes dos serviços contratados.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-[1200px] w-full mx-auto flex-1">
          {session?.user ? (
            <InfiniteBookingsGrid
              initialBookings={initialBookings}
              initialNextCursor={initialNextCursor}
            />
          ) : (
            /* Logged Out Glassmorphism card */
            <div className="flex flex-col items-center justify-center text-center p-8 md:p-16 max-w-lg mx-auto bg-white/70 dark:bg-neutral-900/50 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-800/50 rounded-3xl shadow-2xl mt-10">
              <div className="p-4 bg-primary/10 rounded-full mb-6">
                <Lock className="h-10 w-10 text-primary" />
              </div>
              <h2 className="font-display font-extrabold text-2xl text-neutral-900 dark:text-neutral-50 mb-3">
                Acesso Restrito
              </h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8 max-w-sm">
                Inicie sessão para aceder à sua lista de reservas personalizada, acompanhar os estados dos agendamentos e interagir com os prestadores.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                <Link href="/sign-in" className="flex-1 sm:flex-initial">
                  <Button className="w-full sm:px-8 py-3 bg-primary text-black font-semibold text-xs rounded-full shadow-md hover:bg-primary/95 transition-all duration-300">
                    Entrar
                  </Button>
                </Link>
                <Link href="/sign-up" className="flex-1 sm:flex-initial">
                  <Button variant="ghost" className="w-full sm:px-8 py-3 rounded-full text-xs font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-all duration-300">
                    Criar Conta
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
