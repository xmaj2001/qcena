"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  Users,
  Search,
  Award,
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Heart,
  ChevronLeft,
  ChevronRight,
  Filter,
  Eye,
  Crown,
  Sparkles,
  Bookmark,
  Building2,
  Star,
  MapPin,
  Mail,
  Phone,
  ExternalLink,
  Plus,
} from "lucide-react";

// Mock Data matching the user's schemas and combining with high-fidelity customer fields
const mockClientsList = [
  {
    userId: "cm9x1a2b3c4d5e6f7g8h9i0l",
    name: "Xavier Jose",
    avatarUrl: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/36.jpg",
    email: "xavier@qcena.com",
    phone: "+244 923 456 789",
    location: "Luanda, Angola",
    industry: "Tecnologia",
    tier: "Enterprise", // matches Enterprise, Growth, Starter
    rank: "GOLD",
    totalBookings: 15,
    totalRevenue: 485000,
    healthScore: 95,
    trend: "up",
    lastContact: "Hoje",
  },
  {
    userId: "_G5ILCxr75s7sL-fkXsvq",
    name: "Grace Altenwerth",
    avatarUrl: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/28.jpg",
    email: "grace.a@hotmail.com",
    phone: "+244 912 345 678",
    location: "Benguela, Angola",
    industry: "Finanças",
    tier: "Enterprise",
    rank: "GOLD",
    totalBookings: 12,
    totalRevenue: 320000,
    healthScore: 88,
    trend: "up",
    lastContact: "Ontem",
  },
  {
    userId: "0IrhhjBtD-ATbHbo6iAoR",
    name: "Milford Witting",
    avatarUrl: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/28.jpg",
    email: "milford.w@qcena.com",
    phone: "+244 934 567 890",
    location: "Luanda, Angola",
    industry: "Educação",
    tier: "Growth",
    rank: "GOLD",
    totalBookings: 10,
    totalRevenue: 156000,
    healthScore: 78,
    trend: "stable",
    lastContact: "Há 3 dias",
  },
  {
    userId: "tRyTs9ilXlmjkfbHEenNf",
    name: "Cloyd Carroll",
    avatarUrl: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/42.jpg",
    email: "cloyd.carroll@gmail.com",
    phone: "+244 945 678 901",
    location: "Lubango, Angola",
    industry: "Saúde",
    tier: "Growth",
    rank: "SILVER",
    totalBookings: 8,
    totalRevenue: 98000,
    healthScore: 65,
    trend: "down",
    lastContact: "Há 2 semanas",
  },
  {
    userId: "Er7XYOjZBU9MjHvsJVR-6",
    name: "Shanie Dickens",
    avatarUrl: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/70.jpg",
    email: "shanie.d@outlook.com",
    phone: "+244 922 888 777",
    location: "Cabinda, Angola",
    industry: "Logística",
    tier: "Starter",
    rank: "SILVER",
    totalBookings: 6,
    totalRevenue: 45000,
    healthScore: 82,
    trend: "up",
    lastContact: "Ontem",
  },
  {
    userId: "XZRuBvUC_h9lJ2Fp99nto",
    name: "Dennis Gleichner",
    avatarUrl: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/72.jpg",
    email: "dennis.g@gmail.com",
    phone: "+244 911 222 333",
    location: "Huambo, Angola",
    industry: "Serviços",
    tier: "Starter",
    rank: "SILVER",
    totalBookings: 5,
    totalRevenue: 35000,
    healthScore: 60,
    trend: "stable",
    lastContact: "Há 1 semana",
  },
];

const tierColors: Record<string, string> = {
  Enterprise: "bg-primary/20 text-black border-primary/30",
  Growth: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  Starter: "bg-neutral-100 text-neutral-500 border-neutral-200",
};

// Client Details detailed mockup mapper
const clientDetailsMock: Record<string, any> = {
  "cm9x1a2b3c4d5e6f7g8h9i0l": {
    userId: "cm9x1a2b3c4d5e6f7g8h9i0l",
    name: "Xavier Jose",
    avatarUrl: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/36.jpg",
    gender: "MALE",
    rank: "GOLD",
    totalCompleted: 12,
    totalCanceled: 2,
    totalPending: 3,
    totalSpent: 485000,
    favoriteServices: [
      {
        serviceId: "s1",
        serviceName: "Corte de Cabelo Premium",
        category: "Beleza",
        timesBooked: 8,
      },
      {
        serviceId: "s2",
        serviceName: "Barba & Toalha Quente",
        category: "Beleza",
        timesBooked: 4,
      },
    ],
  },
  "_G5ILCxr75s7sL-fkXsvq": {
    userId: "_G5ILCxr75s7sL-fkXsvq",
    name: "Grace Altenwerth",
    avatarUrl: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/28.jpg",
    gender: "FEMALE",
    rank: "GOLD",
    totalCompleted: 10,
    totalCanceled: 1,
    totalPending: 1,
    totalSpent: 320000,
    favoriteServices: [
      {
        serviceId: "s3",
        serviceName: "Massagem Terapêutica",
        category: "Bem-estar",
        timesBooked: 7,
      },
    ],
  },
  "0IrhhjBtD-ATbHbo6iAoR": {
    userId: "0IrhhjBtD-ATbHbo6iAoR",
    name: "Milford Witting",
    avatarUrl: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/28.jpg",
    gender: "MALE",
    rank: "GOLD",
    totalCompleted: 9,
    totalCanceled: 0,
    totalPending: 1,
    totalSpent: 156000,
    favoriteServices: [
      {
        serviceId: "s1",
        serviceName: "Corte de Cabelo Premium",
        category: "Beleza",
        timesBooked: 6,
      },
    ],
  },
};

// Default generic details generator for missing mock entities
const getClientDetails = (client: typeof mockClientsList[0]) => {
  return (
    clientDetailsMock[client.userId] || {
      userId: client.userId,
      name: client.name,
      avatarUrl: client.avatarUrl,
      gender: "MALE",
      rank: client.rank,
      totalCompleted: client.totalBookings - 1,
      totalCanceled: 1,
      totalPending: 0,
      totalSpent: client.totalRevenue,
      favoriteServices: [
        {
          serviceId: "s1",
          serviceName: "Corte de Cabelo Premium",
          category: "Beleza",
          timesBooked: client.totalBookings,
        },
      ],
    }
  );
};

// Client bookings list mock
const mockBookingsList = [
  {
    bookingId: "b101",
    clientId: "cm9x1a2b3c4d5e6f7g8h9i0l",
    clientName: "Xavier Jose",
    serviceId: "s1",
    serviceName: "Corte de Cabelo Premium",
    totalPrice: 15000,
    status: "COMPLETED",
    createdAt: "2026-01-15T10:00:00.000Z",
  },
  {
    bookingId: "b102",
    clientId: "cm9x1a2b3c4d5e6f7g8h9i0l",
    clientName: "Xavier Jose",
    serviceId: "s2",
    serviceName: "Barba & Toalha Quente",
    totalPrice: 6000,
    status: "CONFIRMED",
    createdAt: "2026-05-19T09:00:00.000Z",
  },
  {
    bookingId: "b103",
    clientId: "_G5ILCxr75s7sL-fkXsvq",
    clientName: "Grace Altenwerth",
    serviceId: "s3",
    serviceName: "Massagem Terapêutica",
    totalPrice: 20000,
    status: "COMPLETED",
    createdAt: "2026-05-10T14:00:00.000Z",
  },
  {
    bookingId: "b104",
    clientId: "0IrhhjBtD-ATbHbo6iAoR",
    clientName: "Milford Witting",
    serviceId: "s1",
    serviceName: "Corte de Cabelo Premium",
    totalPrice: 10000,
    status: "PENDING",
    createdAt: "2026-05-19T11:00:00.000Z",
  },
];

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  
  // Sheet state
  const [selectedClient, setSelectedClient] = useState<typeof mockClientsList[0] | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Active view tab state
  const [activeTab, setActiveTab] = useState<"listar" | "top" | "reservas">("listar");
  
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copiado para a área de transferência!`);
  };
  
  // Booking filter state
  const [bookingStatusFilter, setBookingStatusFilter] = useState("Todas");
  const [selectedClientFilter, setSelectedClientFilter] = useState("Todos");

  // Filtering Clientes List
  const filteredClients = mockClientsList.filter(client => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = !selectedTier || client.tier === selectedTier;
    return matchesSearch && matchesTier;
  });

  // Top Rank Clients (sorted by total bookings)
  const topClients = [...mockClientsList]
    .sort((a, b) => b.totalBookings - a.totalBookings);

  // Booking history lists
  const filteredBookings = mockBookingsList.filter(booking => {
    const statusMatches =
      bookingStatusFilter === "Todas" || booking.status === bookingStatusFilter;
    const clientMatches =
      selectedClientFilter === "Todos" || booking.clientId === selectedClientFilter;
    return statusMatches && clientMatches;
  });

  const handleOpenClientDetails = (client: typeof mockClientsList[0]) => {
    setSelectedClient(client);
    setIsSheetOpen(true);
  };

  const getRankBadgeClass = (rank: string) => {
    switch (rank) {
      case "GOLD":
        return "bg-amber-500/10 text-amber-600 border border-amber-500/20";
      case "SILVER":
        return "bg-slate-400/15 text-slate-500 border border-slate-400/20";
      case "BRONZE":
        return "bg-orange-400/10 text-orange-500 border border-orange-400/20";
      default:
        return "bg-neutral-100 text-neutral-500";
    }
  };

  // Calculate high-fidelity summary metrics
  const totalRevenue = mockClientsList.reduce((acc, c) => acc + c.totalRevenue, 0);
  const avgHealthScore = Math.round(
    mockClientsList.reduce((acc, c) => acc + c.healthScore, 0) / mockClientsList.length
  );
  const totalBookingsCount = mockClientsList.reduce((acc, c) => acc + c.totalBookings, 0);

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 lg:p-10 bg-neutral-50/50 dark:bg-neutral-950/20 min-h-screen">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-5 w-5 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Controle de Clientes</span>
          </div>
          <h1 className="text-3xl font-display font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
            Meus Clientes
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Acompanhe o faturamento, volume de agendamentos e o índice de satisfação (Health Score) de seus clientes ativos.
          </p>
        </div>
      </div>

      {/* 🚀 Summary Cards Grid (User Template Design) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total de Clientes",
            value: mockClientsList.length.toString(),
            icon: Building2,
            color: "text-neutral-800 dark:text-neutral-100",
          },
          {
            label: "Faturamento Acumulado",
            value: `${(totalRevenue / 1000).toFixed(0)}k AOA`,
            icon: DollarSign,
            color: "text-primary dark:text-primary",
          },
          {
            label: "Média Health Score",
            value: `${avgHealthScore}%`,
            icon: Star,
            color: "text-indigo-500",
          },
          {
            label: "Reservas Efetuadas",
            value: totalBookingsCount.toString(),
            icon: TrendingUp,
            color: "text-emerald-500",
          },
        ].map((stat, index) => (
          <Card
            key={stat.label}
            className="border-neutral-150 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/60 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300"
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">{stat.label}</p>
                  <p className={`text-2xl font-extrabold mt-1.5 ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color} opacity-40`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Navigation tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-4">
        <Button
          variant={activeTab === "listar" ? "default" : "outline"}
          onClick={() => setActiveTab("listar")}
          className="rounded-xl text-xs font-bold h-10 px-5 duration-200"
        >
          Lista de Clientes (Cards)
        </Button>
        <Button
          variant={activeTab === "top" ? "default" : "outline"}
          onClick={() => setActiveTab("top")}
          className="rounded-xl text-xs font-bold h-10 px-5 duration-200"
        >
          Top N Clientes
        </Button>
        <Button
          variant={activeTab === "reservas" ? "default" : "outline"}
          onClick={() => setActiveTab("reservas")}
          className="rounded-xl text-xs font-bold h-10 px-5 duration-200"
        >
          Histórico de Reservas
        </Button>
      </div>

      {/* 💳 LISTAR TAB: GORGEOUS CUSTOMER CARDS GRID */}
      {activeTab === "listar" && (
        <div className="flex flex-col gap-6">
          {/* Filters and Search Bar (User Template Design) */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex items-center gap-3 flex-wrap w-full lg:w-auto">
              <div className="relative flex-1 lg:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-450" />
                <Input
                  placeholder="Pesquisar por nome ou e-mail..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full lg:w-[280px] rounded-xl h-10 border-neutral-200 dark:border-neutral-800 bg-white"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-neutral-400" />
                {["Enterprise", "Growth", "Starter"].map((tier) => (
                  <Button
                    key={tier}
                    variant={selectedTier === tier ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTier(selectedTier === tier ? null : tier)}
                    className={`rounded-lg text-xs font-bold h-8 px-3 ${
                      selectedTier === tier ? "bg-primary text-black" : ""
                    }`}
                  >
                    {tier}
                  </Button>
                ))}
              </div>
            </div>
            <Button
              className="bg-primary hover:bg-primary/95 text-black font-bold rounded-xl h-10 px-4 text-xs"
              onClick={() => toast.info("Funcionalidade de cadastro disponível na API.")}
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Cliente
            </Button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredClients.length === 0 ? (
              <div className="col-span-2 text-center p-12 bg-white dark:bg-neutral-900 border rounded-xl text-neutral-400 font-semibold text-sm">
                Nenhum cliente correspondente encontrado.
              </div>
            ) : (
              filteredClients.map((client, index) => (
                <Card
                  key={client.userId}
                  className="border-neutral-100 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/40 hover:border-primary/40 dark:hover:border-primary/30 transition-all duration-300 group"
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 border">
                          <AvatarFallback className="bg-neutral-100 text-neutral-750 font-bold">
                            {client.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </AvatarFallback>
                          <img src={client.avatarUrl} alt={client.name} className="object-cover size-full rounded-full" />
                        </Avatar>
                        <div>
                          <h3 className="font-bold text-sm text-neutral-800 dark:text-neutral-100 group-hover:text-primary transition-colors">
                            {client.name}
                          </h3>
                          <p className="text-xs text-neutral-400">{client.industry} • Rank {client.rank}</p>
                        </div>
                      </div>
                      <Badge className={`text-[9px] font-bold tracking-wider ${tierColors[client.tier]} border`}>
                        {client.tier}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-neutral-500">
                          <MapPin className="w-3.5 h-3.5" />
                          {client.location}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-neutral-500">
                          <Mail className="w-3.5 h-3.5" />
                          {client.email}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-neutral-500">
                          <Phone className="w-3.5 h-3.5" />
                          {client.phone}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-neutral-400">Total Pago</span>
                          <span className="font-bold text-neutral-700 dark:text-neutral-250">
                            {client.totalRevenue.toLocaleString()} AOA
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-neutral-400">Reservas</span>
                          <span className="font-bold text-neutral-750 dark:text-neutral-200">{client.totalBookings} efetuadas</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Último Contato</span>
                          <span className="font-bold text-neutral-600 dark:text-neutral-350">{client.lastContact}</span>
                        </div>
                      </div>
                    </div>

                    {/* Health Score Progress Indicator (User Template Design) */}
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-neutral-450">Fidelidade (Health)</span>
                        {client.trend === "up" && (
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                        )}
                        {client.trend === "down" && (
                          <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                        )}
                        {client.trend === "stable" && (
                          <span className="text-[10px] text-neutral-400 font-bold">•</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: `${client.healthScore}%`,
                              backgroundColor:
                                client.healthScore >= 80
                                  ? "oklch(0.7 0.18 145)"
                                  : client.healthScore >= 60
                                  ? "oklch(0.75 0.18 55)"
                                  : "oklch(0.65 0.2 25)",
                            }}
                          />
                        </div>
                        <span
                          className={`text-xs font-bold ${
                            client.healthScore >= 80
                              ? "text-emerald-500"
                              : client.healthScore >= 60
                              ? "text-indigo-500"
                              : "text-red-500"
                          }`}
                        >
                          {client.healthScore}%
                        </span>
                      </div>
                    </div>

                    {/* Quick Action Button Panel */}
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent rounded-lg h-9 text-xs font-semibold"
                        onClick={() => toast.success(`Agendamento solicitado para ${client.name}`)}
                      >
                        <Calendar className="w-3.5 h-3.5 mr-1.5" />
                        Agendar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent rounded-lg h-9 text-xs font-semibold"
                        onClick={() => copyToClipboard(client.email, "E-mail")}
                      >
                        <Mail className="w-3.5 h-3.5 mr-1.5" />
                        E-mail
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-lg size-9 hover:bg-neutral-100"
                        onClick={() => handleOpenClientDetails(client)}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      )}

      {/* TOP TAB: LEADERBOARD OF HIGHEST RANK CLIENTS */}
      {activeTab === "top" && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topClients.map((client, index) => (
              <Card key={client.userId} className="border-neutral-100 dark:border-neutral-800/80 shadow-xs flex items-center justify-between p-4 hover:scale-[1.01] duration-300">
                <div className="flex items-center gap-4">
                  <div className={`flex items-center justify-center size-10 rounded-full font-extrabold text-sm ${
                    index === 0 ? "bg-amber-500/25 text-amber-600" :
                    index === 1 ? "bg-slate-400/25 text-slate-500" :
                    index === 2 ? "bg-orange-500/25 text-orange-500" :
                    "bg-neutral-100 text-neutral-500"
                  }`}>
                    {index + 1}º
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src={client.avatarUrl}
                      alt={client.name}
                      className="size-11 rounded-full object-cover border"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="font-extrabold text-sm text-neutral-800 dark:text-neutral-100">{client.name}</p>
                        {index === 0 && <Crown className="size-3.5 text-amber-500 fill-amber-500" />}
                      </div>
                      <p className="text-xs text-neutral-400">{client.email}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider ${getRankBadgeClass(client.rank)}`}>
                    {client.rank}
                  </span>
                  <p className="font-bold text-xs text-neutral-600 dark:text-neutral-300 mt-2">
                    {client.totalBookings} Reservas Totais
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* RESERVAS TAB: LOG OF BOOKINGS */}
      {activeTab === "reservas" && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-300">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-neutral-500">Status:</span>
              <div className="flex gap-1.5">
                {["Todas", "PENDING", "CONFIRMED", "COMPLETED", "CANCELED"].map(status => (
                  <Button
                    key={status}
                    variant={bookingStatusFilter === status ? "default" : "outline"}
                    className="rounded-xl text-[10px] font-bold h-8 px-3"
                    onClick={() => setBookingStatusFilter(status)}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-neutral-500">Filtrar Cliente:</span>
              <select
                value={selectedClientFilter}
                onChange={(e) => setSelectedClientFilter(e.target.value)}
                className="rounded-xl h-8 border border-neutral-200 dark:border-neutral-800 bg-white px-3 text-[10px] font-bold"
              >
                <option value="Todos">Todos os Clientes</option>
                {mockClientsList.map(c => (
                  <option key={c.userId} value={c.userId}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <Card className="border-neutral-100 dark:border-neutral-800/80 shadow-xs">
            <CardContent className="p-0">
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-100 dark:border-neutral-800 text-[10px] uppercase font-bold text-neutral-400 bg-neutral-50/50 dark:bg-neutral-900/30">
                      <th className="p-4 pl-6">ID Reserva</th>
                      <th className="p-4">Cliente</th>
                      <th className="p-4">Serviço Booked</th>
                      <th className="p-4">Preço Pago</th>
                      <th className="p-4">Data Registro</th>
                      <th className="p-4 pr-6">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-12 text-center text-sm text-neutral-400 font-medium">
                          Nenhuma reserva arquivada correspondente aos filtros.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map(b => (
                        <tr key={b.bookingId} className="hover:bg-neutral-50/30 dark:hover:bg-neutral-900/10 transition-colors">
                          <td className="p-4 pl-6 text-xs text-neutral-400 font-mono">
                            {b.bookingId}
                          </td>
                          <td className="p-4 text-sm font-semibold text-neutral-700 dark:text-neutral-200">
                            {b.clientName}
                          </td>
                          <td className="p-4 text-sm text-neutral-800 dark:text-neutral-100">
                            {b.serviceName}
                          </td>
                          <td className="p-4 font-bold text-xs text-neutral-600 dark:text-neutral-300">
                            {b.totalPrice.toLocaleString()} AOA
                          </td>
                          <td className="p-4 text-xs text-neutral-400">
                            {new Date(b.createdAt).toLocaleDateString("pt-PT")}
                          </td>
                          <td className="p-4 pr-6">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              b.status === "COMPLETED" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                              b.status === "CONFIRMED" ? "bg-blue-500/10 text-blue-500 border border-blue-500/20" :
                              b.status === "PENDING" ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" :
                              "bg-red-500/10 text-red-500 border border-red-500/20"
                            }`}>
                                {b.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Details Side-Drawer (Sheet) */}
      {selectedClient && (() => {
        const details = getClientDetails(selectedClient);
        const favorite = details.favoriteServices[0];

        return (
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetContent className="max-w-md w-full bg-white dark:bg-neutral-900 border-l border-neutral-100 dark:border-neutral-800 p-6 shadow-xl h-full flex flex-col justify-between overflow-y-auto">
              <div className="flex flex-col gap-6">
                <SheetHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider ${getRankBadgeClass(details.rank)}`}>
                      {details.rank}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                      Gênero: {details.gender}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <img
                      src={details.avatarUrl}
                      alt={details.name}
                      className="size-14 rounded-full object-cover border border-neutral-200 shadow-sm"
                    />
                    <div>
                      <SheetTitle className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
                        {details.name}
                      </SheetTitle>
                      <SheetDescription className="text-xs text-neutral-400 mt-1">
                        ID: {details.userId}
                      </SheetDescription>
                    </div>
                  </div>
                </SheetHeader>

                <Separator className="bg-neutral-100 dark:bg-neutral-800" />

                {/* Performance stats row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-950/45 border border-neutral-100 dark:border-neutral-800 rounded-xl">
                    <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Concluídas</p>
                    <p className="font-extrabold text-sm text-emerald-500 mt-1">{details.totalCompleted} Agendamentos</p>
                  </div>
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-950/45 border border-neutral-100 dark:border-neutral-800 rounded-xl">
                    <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Total Consumido</p>
                    <p className="font-extrabold text-sm text-neutral-800 dark:text-neutral-100 mt-1">
                      {details.totalSpent.toLocaleString()} AOA
                    </p>
                  </div>
                </div>

                {/* Cancelled vs Pending */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-red-500/5 border border-red-500/15 rounded-xl">
                    <span className="text-[9px] font-bold text-red-500 uppercase tracking-wider">Canceladas</span>
                    <p className="font-bold text-neutral-700 dark:text-neutral-200 mt-1">{details.totalCanceled} reservas</p>
                  </div>
                  <div className="p-3 bg-amber-500/5 border border-amber-500/15 rounded-xl">
                    <span className="text-[9px] font-bold text-amber-500 uppercase tracking-wider">Pendentes</span>
                    <p className="font-bold text-neutral-700 dark:text-neutral-200 mt-1">{details.totalPending} reservas</p>
                  </div>
                </div>

                {/* Highlight: Favorite single service */}
                {favorite && (
                  <div className="p-4 bg-linear-to-tr from-primary/10 to-primary/5 border border-primary/20 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-primary">
                        <Heart className="size-4 fill-primary" />
                        <span className="text-[10px] font-extrabold uppercase tracking-wider">Serviço Favorito</span>
                      </div>
                      <p className="font-extrabold text-sm text-neutral-900 mt-1.5">{favorite.serviceName}</p>
                      <p className="text-[10px] text-neutral-500">{favorite.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-lg text-primary">{favorite.timesBooked}x</p>
                      <p className="text-[9px] text-neutral-400 uppercase font-bold tracking-wider">Contratado</p>
                    </div>
                  </div>
                )}

                {/* Favorite Services detailed list */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Distribuição de Favoritismo</h3>
                  <div className="flex flex-col gap-3.5">
                    {details.favoriteServices.map((svc: any) => (
                      <div key={svc.serviceId}>
                        <div className="flex justify-between items-center text-xs mb-1.5">
                          <span className="font-semibold text-neutral-700 dark:text-neutral-300">{svc.serviceName}</span>
                          <span className="font-bold text-neutral-500">{svc.timesBooked} agendamentos</span>
                        </div>
                        <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${Math.min(100, (svc.timesBooked / details.totalCompleted) * 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  variant="outline"
                  className="w-full rounded-xl font-bold h-11 border-neutral-300"
                  onClick={() => setIsSheetOpen(false)}
                >
                  Fechar Perfil
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        );
      })()}
    </div>
  );
}
