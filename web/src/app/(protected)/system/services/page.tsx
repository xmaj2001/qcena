"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import {
  Sparkles,
  Search,
  DollarSign,
  Users,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FileText,
  Bookmark,
  TrendingUp,
  XCircle,
  ChevronRight,
  Eye,
  SlidersHorizontal,
} from "lucide-react";

// Full high-fidelity mock services list
const initialServices = [
  {
    id: "1",
    name: "Corte de Cabelo Premium",
    category: "Beleza",
    price: 10000,
    status: "Ativo",
    favoritismIndex: "#1 no Ranking",
    totalBookings: 145,
    completedBookings: 120,
    pendingBookings: 15,
    canceledBookings: 10,
    revenue: 1450000,
    uniqueClients: 84,
    description: "Corte premium completo com lavagem, massagem capilar e finalização com pomada.",
  },
  {
    id: "2",
    name: "Barba & Toalha Quente",
    category: "Beleza",
    price: 6000,
    status: "Ativo",
    favoritismIndex: "#3 no Ranking",
    totalBookings: 98,
    completedBookings: 85,
    pendingBookings: 8,
    canceledBookings: 5,
    revenue: 588000,
    uniqueClients: 52,
    description: "Barboterapia tradicional com toalhas aquecidas, óleos hidratantes e massagem facial.",
  },
  {
    id: "3",
    name: "Massagem Terapêutica",
    category: "Bem-estar",
    price: 20000,
    status: "Ativo",
    favoritismIndex: "#2 no Ranking",
    totalBookings: 76,
    completedBookings: 65,
    pendingBookings: 6,
    canceledBookings: 5,
    revenue: 1520000,
    uniqueClients: 41,
    description: "Alívio de dores musculares profunda combinando liberação miofascial e pedras quentes.",
  },
  {
    id: "4",
    name: "Treino Personalizado",
    category: "Fitness",
    price: 15000,
    status: "Ativo",
    favoritismIndex: "#4 no Ranking",
    totalBookings: 54,
    completedBookings: 45,
    pendingBookings: 7,
    canceledBookings: 2,
    revenue: 810000,
    uniqueClients: 19,
    description: "Consultoria fitness individual de 1 hora focada em hipertrofia ou emagrecimento.",
  },
  {
    id: "5",
    name: "Manicure & Pedicure Express",
    category: "Estética",
    price: 8000,
    status: "Pendente",
    favoritismIndex: "#5 no Ranking",
    totalBookings: 32,
    completedBookings: 25,
    pendingBookings: 4,
    canceledBookings: 3,
    revenue: 256000,
    uniqueClients: 14,
    description: "Limpeza, cuticulagem e esmaltação rápida de unhas das mãos e pés.",
  },
  {
    id: "6",
    name: "Limpeza de Pele Profunda",
    category: "Estética",
    price: 18000,
    status: "Ativo",
    favoritismIndex: "#6 no Ranking",
    totalBookings: 28,
    completedBookings: 22,
    pendingBookings: 3,
    canceledBookings: 3,
    revenue: 504000,
    uniqueClients: 18,
    description: "Remoção profunda de cravos e impurezas com peeling de diamante e máscara calmante.",
  },
];

export default function ServicesPage() {
  const [services] = useState(initialServices);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState<typeof initialServices[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDetails = (service: typeof initialServices[0]) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 lg:p-10 bg-neutral-50/50 dark:bg-neutral-950/20 min-h-screen">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Gestão de Portfólio</span>
          </div>
          <h1 className="text-3xl font-display font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
            Meus Serviços
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Gerencie seu catálogo de serviços, visualize o ranking de favoritismo e acompanhe a receita de cada agendamento.
          </p>
        </div>
      </div>

      {/* Analytics Summary Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-neutral-100 dark:border-neutral-800/80 shadow-xs bg-linear-to-t from-primary/5 to-card">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-bold uppercase tracking-wider text-neutral-500">Serviço Mais Reservado</CardDescription>
            <CardTitle className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mt-1">
              Corte de Cabelo Premium
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-3 text-xs text-neutral-400">
            145 reservas concluídas e favoritas
          </CardContent>
        </Card>
        <Card className="border-neutral-100 dark:border-neutral-800/80 shadow-xs">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-bold uppercase tracking-wider text-neutral-500">Serviço Menos Reservado</CardDescription>
            <CardTitle className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mt-1">
              Limpeza de Pele Profunda
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-3 text-xs text-neutral-400">
            28 reservas concluídas nos últimos meses
          </CardContent>
        </Card>
        <Card className="border-neutral-100 dark:border-neutral-800/80 shadow-xs">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-bold uppercase tracking-wider text-neutral-500">Total Portfólio Receita</CardDescription>
            <CardTitle className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mt-1">
              5.078.000 AOA
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-3 text-xs text-neutral-400">
            Gerado de reservas concluídas
          </CardContent>
        </Card>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-[350px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
          <Input
            placeholder="Pesquisar serviços por nome ou categoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10 rounded-xl border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
          />
        </div>
        <Button variant="outline" className="rounded-xl h-10 w-full sm:w-auto text-xs font-semibold">
          <SlidersHorizontal className="mr-2 size-4" />
          Filtros Avançados
        </Button>
      </div>

      {/* Services Grid list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map(service => (
          <Card key={service.id} className="border-neutral-100 dark:border-neutral-800/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {service.category}
                </span>
                <span className="text-xs font-bold text-neutral-400">
                  {service.favoritismIndex}
                </span>
              </div>
              <CardTitle className="text-lg font-bold text-neutral-950 dark:text-neutral-50 mt-2">
                {service.name}
              </CardTitle>
              <CardDescription className="text-xs line-clamp-2 mt-1">
                {service.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-4 flex flex-col gap-3">
              <div className="flex items-center justify-between border-t border-b border-neutral-100 dark:border-neutral-800 py-3">
                <div>
                  <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Preço</p>
                  <p className="font-bold text-sm text-neutral-800 dark:text-neutral-100">
                    {service.price.toLocaleString()} AOA
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Status</p>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    service.status === "Ativo" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                  }`}>
                    {service.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-neutral-400">Reservas Totais</p>
                  <p className="font-semibold text-neutral-700 dark:text-neutral-200">{service.totalBookings}</p>
                </div>
                <div>
                  <p className="text-neutral-400">Receita Total</p>
                  <p className="font-semibold text-neutral-700 dark:text-neutral-200">{service.revenue.toLocaleString()} AOA</p>
                </div>
              </div>
            </CardContent>
            <CardContent className="pt-0 pb-4">
              <Button
                variant="outline"
                className="w-full rounded-xl text-xs font-semibold hover:bg-neutral-100"
                onClick={() => handleOpenDetails(service)}
              >
                <Eye className="mr-2 size-4" />
                Ver Detalhes do Serviço
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Services Details Sheet / Modal */}
      {selectedService && (
        <Sheet open={isModalOpen} onOpenChange={setIsModalOpen}>
          <SheetContent className="max-w-md w-full bg-white dark:bg-neutral-900 border-l border-neutral-100 dark:border-neutral-800 p-6 shadow-xl h-full flex flex-col justify-between overflow-y-auto">
            <div className="flex flex-col gap-6">
              <SheetHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {selectedService.category}
                  </span>
                  <Badge variant="outline" className="text-[10px] font-bold border-neutral-300">
                    {selectedService.favoritismIndex}
                  </Badge>
                </div>
                <SheetTitle className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
                  {selectedService.name}
                </SheetTitle>
                <SheetDescription className="text-xs text-neutral-400 mt-1">
                  Análise detalhada de performance e agendamentos.
                </SheetDescription>
              </SheetHeader>

              <Separator className="bg-neutral-100 dark:bg-neutral-800" />

              <div className="flex flex-col gap-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Descrição do Serviço</h3>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed bg-neutral-50 dark:bg-neutral-950 p-3.5 rounded-xl border border-neutral-100 dark:border-neutral-800">
                  {selectedService.description}
                </p>
              </div>

              {/* Booking Statistics Breakdown */}
              <div className="flex flex-col gap-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Reservas por Estado</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Concluídas</p>
                    <p className="font-extrabold text-lg text-emerald-600 mt-1">{selectedService.completedBookings}</p>
                  </div>
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center">
                    <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Pendentes</p>
                    <p className="font-extrabold text-lg text-amber-600 mt-1">{selectedService.pendingBookings}</p>
                  </div>
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                    <p className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Canceladas</p>
                    <p className="font-extrabold text-lg text-red-600 mt-1">{selectedService.canceledBookings}</p>
                  </div>
                </div>
              </div>

              {/* Financial Metrics */}
              <div className="flex flex-col gap-4 bg-neutral-50 dark:bg-neutral-950 p-4 border border-neutral-100 dark:border-neutral-800 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="size-4 text-emerald-500" />
                    <span className="text-xs text-neutral-500 font-semibold">Receita Acumulada</span>
                  </div>
                  <span className="font-extrabold text-sm text-neutral-800 dark:text-neutral-100">
                    {selectedService.revenue.toLocaleString()} AOA
                  </span>
                </div>
                <Separator className="bg-neutral-200/50 dark:bg-neutral-800/50" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="size-4 text-primary" />
                    <span className="text-xs text-neutral-500 font-semibold">Clientes Únicos</span>
                  </div>
                  <span className="font-extrabold text-sm text-neutral-800 dark:text-neutral-100">
                    {selectedService.uniqueClients} Clientes
                  </span>
                </div>
                <Separator className="bg-neutral-200/50 dark:bg-neutral-800/50" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="size-4 text-primary animate-pulse" />
                    <span className="text-xs text-neutral-500 font-semibold">Índice Favoritismo</span>
                  </div>
                  <span className="font-extrabold text-sm text-neutral-800 dark:text-neutral-100 uppercase tracking-wider">
                    {selectedService.favoritismIndex}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button
                variant="outline"
                className="w-full rounded-xl font-bold h-11 border-neutral-300"
                onClick={() => setIsModalOpen(false)}
              >
                Fechar Painel
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
