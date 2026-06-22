import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Users,
  Clock,
  Sparkles,
  ArrowUpRight,
  TrendingDown,
  ShoppingBag,
  Bell,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Qcena - Painel do Prestador",
  description: "Visão geral da sua atividade e desempenho na plataforma.",
};

export default function SystemDashboardPage() {
  // Mock data for top performing services
  const topServices = [
    { id: "1", name: "Corte de Cabelo Premium", category: "Beleza", bookings: 145, revenue: 1450000, favoritism: "98%" },
    { id: "2", name: "Barba & Toalha Quente", category: "Beleza", bookings: 98, revenue: 588000, favoritism: "92%" },
    { id: "3", name: "Massagem Terapêutica", category: "Bem-estar", bookings: 76, revenue: 1520000, favoritism: "89%" },
    { id: "4", name: "Treino Personalizado", category: "Fitness", bookings: 54, revenue: 810000, favoritism: "85%" },
  ];

  // Mock data for recent client bookings
  const recentBookings = [
    { id: "b1", client: "Afonso de Sousa", email: "afonso@gmail.com", service: "Corte de Cabelo Premium", time: "Hoje, 15:30", price: 10000, status: "Confirmada" },
    { id: "b2", client: "Beatriz Gaspar", email: "beatriz@hotmail.com", service: "Massagem Terapêutica", time: "Hoje, 17:00", price: 20000, status: "Pendente" },
    { id: "b3", client: "Carlos Manuel", email: "carlos@outlook.com", service: "Barba & Toalha Quente", time: "Amanhã, 10:00", price: 6000, status: "Confirmada" },
    { id: "b4", client: "Daniela Antunes", email: "daniela@gmail.com", service: "Treino Personalizado", time: "Amanhã, 11:30", price: 15000, status: "Concluída" },
  ];

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 lg:p-10 bg-neutral-50/50 dark:bg-neutral-950/20 min-h-screen">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Painel Qcena</span>
          </div>
          <h1 className="text-3xl font-display font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
            Painel do Prestador
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Acompanhe o desempenho do seu negócio, gerencie reservas de clientes e acompanhe as metas em tempo real.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/system/metas">
            <Button variant="outline" className="rounded-xl text-xs font-semibold">
              <Calendar className="mr-2 size-4" />
              Verificar Metas
            </Button>
          </Link>
          <Link href="/system/services">
            <Button className="rounded-xl bg-primary text-black font-semibold text-xs hover:bg-primary/95 shadow-md shadow-primary/10">
              Meus Serviços
            </Button>
          </Link>
        </div>
      </div>

      {/* Grid: Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Revenue */}
        <Card className="@container/card bg-linear-to-t from-primary/5 to-card border-neutral-100 dark:border-neutral-800/80 shadow-xs hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-3">
            <CardDescription className="text-xs font-bold uppercase tracking-wider text-neutral-500">Receita Total</CardDescription>
            <CardTitle className="text-2xl md:text-3xl font-semibold tabular-nums text-neutral-900 dark:text-neutral-50 mt-1">
              4.368.000 AOA
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                <TrendingUp className="mr-1 size-3.5" />
                +14.2%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="text-xs text-neutral-400">Trending up this month compared to last month</p>
          </CardContent>
        </Card>

        {/* Card 2: Active Services */}
        <Card className="@container/card border-neutral-100 dark:border-neutral-800/80 shadow-xs hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-3">
            <CardDescription className="text-xs font-bold uppercase tracking-wider text-neutral-500">Serviços Ativos</CardDescription>
            <CardTitle className="text-2xl md:text-3xl font-semibold tabular-nums text-neutral-900 dark:text-neutral-50 mt-1">
              12 Serviços
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                <Sparkles className="mr-1 size-3.5" />
                Excelente
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="text-xs text-neutral-400">Total portfolio of active and public bookings</p>
          </CardContent>
        </Card>

        {/* Card 3: Today's Bookings */}
        <Card className="@container/card border-neutral-100 dark:border-neutral-800/80 shadow-xs hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-3">
            <CardDescription className="text-xs font-bold uppercase tracking-wider text-neutral-500">Reservas Hoje</CardDescription>
            <CardTitle className="text-2xl md:text-3xl font-semibold tabular-nums text-neutral-900 dark:text-neutral-50 mt-1">
              5 Clientes
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                <Clock className="mr-1 size-3.5" />
                Hoje
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="text-xs text-neutral-400">Scheduled services slot for today's timeline</p>
          </CardContent>
        </Card>

        {/* Card 4: Total Bookings */}
        <Card className="@container/card border-neutral-100 dark:border-neutral-800/80 shadow-xs hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-3">
            <CardDescription className="text-xs font-bold uppercase tracking-wider text-neutral-500">Total Reservas</CardDescription>
            <CardTitle className="text-2xl md:text-3xl font-semibold tabular-nums text-neutral-900 dark:text-neutral-50 mt-1">
              373 Reservas
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                <TrendingUp className="mr-1 size-3.5" />
                +24%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="text-xs text-neutral-400">Accumulated reservations since provider signup</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Interactive Chart Section */}
      <div className="w-full">
        <ChartAreaInteractive />
      </div>

      {/* Grid: Top Services and Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Card: Top Performing Services */}
        <Card className="border-neutral-100 dark:border-neutral-800/80 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
            <div>
              <CardTitle className="text-base font-bold text-neutral-900 dark:text-neutral-50">Serviços Mais Reservados</CardTitle>
              <CardDescription className="text-xs">Classificação baseada no favoritismo e volume total</CardDescription>
            </div>
            <Link href="/system/services">
              <Button variant="ghost" className="text-xs font-semibold text-primary hover:underline p-0 h-auto">
                Ver todos
                <ArrowUpRight className="ml-1 size-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {topServices.map((service, index) => (
                <div key={service.id} className="flex items-center justify-between p-4 hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary font-bold text-xs">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-neutral-800 dark:text-neutral-100">{service.name}</p>
                      <p className="text-xs text-neutral-400">{service.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-neutral-800 dark:text-neutral-100">{service.bookings} Reservas</p>
                    <p className="text-xs text-neutral-400">{service.revenue.toLocaleString()} AOA</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Card: Recent Bookings Log */}
        <Card className="border-neutral-100 dark:border-neutral-800/80 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
            <div>
              <CardTitle className="text-base font-bold text-neutral-900 dark:text-neutral-50">Reservas Recentes</CardTitle>
              <CardDescription className="text-xs">Últimos agendamentos feitos por clientes</CardDescription>
            </div>
            <Link href="/system/bookings">
              <Button variant="ghost" className="text-xs font-semibold text-primary hover:underline p-0 h-auto">
                Ver reservas
                <ArrowUpRight className="ml-1 size-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30 transition-colors">
                  <div>
                    <p className="font-semibold text-sm text-neutral-800 dark:text-neutral-100">{booking.client}</p>
                    <p className="text-xs text-neutral-400">{booking.service} • {booking.time}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      booking.status === "Confirmada" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                      booking.status === "Pendente" ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" :
                      "bg-indigo-500/10 text-indigo-500 border border-indigo-500/20"
                    }`}>
                      {booking.status}
                    </span>
                    <span className="font-bold text-xs text-neutral-600 dark:text-neutral-300">
                      {booking.price.toLocaleString()} AOA
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
