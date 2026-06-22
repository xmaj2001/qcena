"use client";

import { useEffect, useState, useRef } from "react";
import Grid from "@/components/services/grid";
import { GridTileImage } from "@/components/services/grid/tile";
import Link from "next/link";
import { getBookings } from "@/server/bookings/features/get-bookings.feat";
import { ApiBooking, BookingStatus, BookingStatusEnum } from "@/server/bookings/types/booking";
import { Loader2, Search, Calendar, DollarSign, Tag, CheckCircle2 } from "lucide-react";

interface InfiniteBookingsGridProps {
  initialBookings: ApiBooking[];
  initialNextCursor: string | null;
}

export function InfiniteBookingsGrid({
  initialBookings,
  initialNextCursor,
}: InfiniteBookingsGridProps) {
  const [items, setItems] = useState<ApiBooking[]>(initialBookings);
  const [nextCursor, setNextCursor] = useState<string | null>(initialNextCursor);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<BookingStatus | "ALL">("ALL");
  const [searchText, setSearchText] = useState("");
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Restart status when props change
  useEffect(() => {
    setItems(initialBookings);
    setNextCursor(initialNextCursor);
  }, [initialBookings, initialNextCursor]);

  const fetchBookings = async (statusFilter: BookingStatus | "ALL", searchVal: string, reset = false) => {
    setLoading(true);
    try {
      const response = await getBookings({
        status: statusFilter === "ALL" ? undefined : statusFilter,
        search: searchVal || undefined,
        limit: 9,
        cursor: reset ? undefined : (nextCursor || undefined),
      });

      if (response.success && response.data) {
        if (reset) {
          setItems(response.data.items);
        } else {
          setItems((prev) => [...prev, ...response.data.items]);
        }
        setNextCursor(response.data.nextCursor);
      }
    } catch (error) {
      console.error("Erro ao carregar reservas:", error);
    } finally {
      setLoading(false);
    }
  };

  // Trigger loading when tab or search query changes
  const handleTabChange = (tab: BookingStatus | "ALL") => {
    setActiveTab(tab);
    setItems([]);
    setNextCursor(null);
    fetchBookings(tab, searchText, true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchText(val);
    setItems([]);
    setNextCursor(null);
    // Debounce or instant load for simple input
    fetchBookings(activeTab, val, true);
  };

  const loadMore = async () => {
    if (!nextCursor || loading) return;
    await fetchBookings(activeTab, searchText, false);
  };

  // Setup IntersectionObserver for infinite scrolling
  useEffect(() => {
    const currentObserver = observerRef.current;
    if (!nextCursor || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 },
    );

    if (currentObserver) {
      observer.observe(currentObserver);
    }

    return () => {
      if (currentObserver) {
        observer.unobserve(currentObserver);
      }
    };
  }, [nextCursor, loading, loadMore]);

  // Formatter helpers
  const formatScheduledDate = (dateVal: string | Date) => {
    const date = new Date(dateVal);
    return date.toLocaleDateString("pt-PT", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.PENDING:
        return "bg-amber-500/10 text-amber-500 border border-amber-500/20";
      case BookingStatus.CONFIRMED:
        return "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20";
      case BookingStatus.CANCELED:
        return "bg-rose-500/10 text-rose-500 border border-rose-500/20";
      case BookingStatus.COMPLETED:
        return "bg-indigo-500/10 text-indigo-500 border border-indigo-500/20";
      default:
        return "bg-neutral-500/10 text-neutral-500 border border-neutral-500/20";
    }
  };

  const tabs: { label: string; value: BookingStatus | "ALL" }[] = [
    { label: "Todas", value: "ALL" },
    { label: "Pendentes", value: BookingStatus.PENDING },
    { label: "Confirmadas", value: BookingStatus.CONFIRMED },
    { label: "Canceladas", value: BookingStatus.CANCELED },
    { label: "Concluídas", value: BookingStatus.COMPLETED },
  ];

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1200px] mx-auto px-4 md:px-0">
      {/* Search and Tabs Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-6">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleTabChange(tab.value)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                activeTab === tab.value
                  ? "bg-primary text-black shadow-md shadow-primary/10"
                  : "bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800/80 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200/20"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search input field */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Procurar por serviço..."
            value={searchText}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 rounded-full text-xs bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200/10 focus:outline-hidden focus:ring-2 focus:ring-primary/50 text-neutral-800 dark:text-neutral-100 transition-all duration-300"
          />
        </div>
      </div>

      {/* Grid List */}
      {items.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((booking) => (
            <Grid.Item key={booking.id} className="animate-fadeIn group h-full">
              <div className="flex flex-col h-full bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-500">
                {/* Image Section */}
                <div className="relative h-48 w-full overflow-hidden">
                  <GridTileImage
                    alt={booking.service.name}
                    src={booking.service.image || "/images/placeholder.png"}
                    fill
                    isInteractive={true}
                    sizes="(min-width: 768px) 33vw, 50vw"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(booking.status)}`}>
                      {BookingStatusEnum[booking.status]}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-1 p-5 gap-4">
                  <div>
                    <h3 className="font-display font-bold text-lg text-neutral-900 dark:text-neutral-100 line-clamp-1 group-hover:text-primary transition-colors duration-300">
                      {booking.service.name}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-2.5 text-xs text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{formatScheduledDate(booking.scheduledAt)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                        {booking.totalPrice.toLocaleString()} AOA
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-neutral-100 dark:border-neutral-800/80 pt-4 mt-auto">
                    <Link
                      href={`/service/${booking.serviceId}`}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-neutral-50 hover:bg-primary dark:bg-neutral-800/50 dark:hover:bg-primary text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-black font-semibold text-xs transition-all duration-300"
                    >
                      <Tag className="h-3.5 w-3.5" />
                      Ver Serviço
                    </Link>
                  </div>
                </div>
              </div>
            </Grid.Item>
          ))}
        </Grid>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 max-w-md mx-auto">
          <div className="p-4 bg-primary/10 rounded-full mb-4">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <h3 className="font-display font-bold text-lg text-neutral-900 dark:text-neutral-100 mb-2">
            Nenhuma reserva encontrada
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6 max-w-xs">
            {searchText
              ? "Experimente mudar os termos de pesquisa ou remover os filtros ativos."
              : "Parece que ainda não fez nenhuma reserva de serviço na Qcena."}
          </p>
          {!searchText && (
            <Link
              href="/search"
              className="px-6 py-3 bg-primary hover:bg-primary/95 text-black font-semibold text-xs rounded-full shadow-md transition-all duration-300"
            >
              Explorar Serviços
            </Link>
          )}
        </div>
      )}

      {/* Loading Trigger & Footer Observer */}
      {nextCursor && (
        <div ref={observerRef} className="flex w-full items-center justify-center py-10">
          {loading ? (
            <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="text-xs font-semibold tracking-wide">A carregar mais reservas...</span>
            </div>
          ) : (
            <div className="h-1 w-full" />
          )}
        </div>
      )}

      {!nextCursor && items.length > 0 && (
        <div className="flex w-full items-center justify-center py-8 border-t border-neutral-100 dark:border-neutral-800/80">
          <span className="text-xs font-semibold tracking-wide text-neutral-400 dark:text-neutral-500">
            Chegou ao fim das suas reservas.
          </span>
        </div>
      )}
    </div>
  );
}
