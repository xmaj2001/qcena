"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Sparkles,
  Search,
  Calendar,
  Clock,
  DollarSign,
  Users,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Check,
  ChevronRight,
  Filter,
  CheckCircle,
} from "lucide-react";

// Mock bookings list
const initialBookings = [
  {
    id: "b1",
    clientName: "Afonso de Sousa",
    clientEmail: "afonso@gmail.com",
    serviceName: "Corte de Cabelo Premium",
    scheduledAt: "Hoje, 15:30",
    totalPrice: 10000,
    status: "Confirmada",
  },
  {
    id: "b2",
    clientName: "Beatriz Gaspar",
    clientEmail: "beatriz@hotmail.com",
    serviceName: "Massagem Terapêutica",
    scheduledAt: "Hoje, 17:00",
    totalPrice: 20000,
    status: "Pendente",
  },
  {
    id: "b3",
    clientName: "Carlos Manuel",
    clientEmail: "carlos@outlook.com",
    serviceName: "Barba & Toalha Quente",
    scheduledAt: "Amanhã, 10:00",
    totalPrice: 6000,
    status: "Confirmada",
  },
  {
    id: "b4",
    clientName: "Daniela Antunes",
    clientEmail: "daniela@gmail.com",
    serviceName: "Treino Personalizado",
    scheduledAt: "Amanhã, 11:30",
    totalPrice: 15000,
    status: "Concluída",
  },
  {
    id: "b5",
    clientName: "Eduardo Fonseca",
    clientEmail: "eduardo@gmail.com",
    serviceName: "Corte de Cabelo Premium",
    scheduledAt: "22 de Maio, 09:00",
    totalPrice: 10000,
    status: "Confirmada",
  },
  {
    id: "b6",
    clientName: "Fernanda Costa",
    clientEmail: "fernanda@hotmail.com",
    serviceName: "Limpeza de Pele Profunda",
    scheduledAt: "22 de Maio, 14:00",
    totalPrice: 18000,
    status: "Cancelada",
  },
  {
    id: "b7",
    clientName: "Gabriel Pires",
    clientEmail: "gabriel@outlook.com",
    serviceName: "Barba & Toalha Quente",
    scheduledAt: "23 de Maio, 16:30",
    totalPrice: 6000,
    status: "Pendente",
  },
];

export default function BookingsPage() {
  const [bookings, setBookings] = useState(initialBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todas");

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setBookings(prev =>
      prev.map(booking => (booking.id === id ? { ...booking, status: newStatus } : booking))
    );
    toast.success(`Status da reserva alterado para ${newStatus} com sucesso!`);
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch =
      booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.serviceName.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeFilter === "Todas") return matchesSearch;
    return matchesSearch && booking.status === activeFilter;
  });

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 lg:p-10 bg-neutral-50/50 dark:bg-neutral-950/20 min-h-screen">
      {/* Header banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Reservas de Clientes</span>
          </div>
          <h1 className="text-3xl font-display font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
            Agenda & Reservas
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Controle os agendamentos de seus clientes. Confirme novos pedidos, conclua serviços finalizados e cancele sessões se necessário.
          </p>
        </div>
      </div>

      {/* Grid count cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-neutral-100 dark:border-neutral-800/80 shadow-xs">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Pendentes</p>
            <p className="font-extrabold text-2xl text-amber-500 mt-1">
              {bookings.filter(b => b.status === "Pendente").length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-neutral-100 dark:border-neutral-800/80 shadow-xs">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Confirmadas</p>
            <p className="font-extrabold text-2xl text-emerald-500 mt-1">
              {bookings.filter(b => b.status === "Confirmada").length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-neutral-100 dark:border-neutral-800/80 shadow-xs">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Concluídas</p>
            <p className="font-extrabold text-2xl text-indigo-500 mt-1">
              {bookings.filter(b => b.status === "Concluída").length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-neutral-100 dark:border-neutral-800/80 shadow-xs">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Canceladas</p>
            <p className="font-extrabold text-2xl text-red-500 mt-1">
              {bookings.filter(b => b.status === "Cancelada").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-[350px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
          <Input
            placeholder="Pesquisar por cliente ou serviço..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10 rounded-xl border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
          />
        </div>

        {/* Filter tags group */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {["Todas", "Pendente", "Confirmada", "Concluída", "Cancelada"].map(filter => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              className="rounded-xl text-xs font-semibold h-9 px-4 duration-200"
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {/* Bookings table list */}
      <Card className="border-neutral-100 dark:border-neutral-800/80 shadow-xs">
        <CardContent className="p-0">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-100 dark:border-neutral-800 text-[10px] uppercase font-bold text-neutral-400 bg-neutral-50/50 dark:bg-neutral-900/30">
                  <th className="p-4 pl-6">Cliente</th>
                  <th className="p-4">Serviço</th>
                  <th className="p-4">Agendamento</th>
                  <th className="p-4">Preço</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4 pr-6 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-sm text-neutral-400 font-medium">
                      Nenhuma reserva encontrada correspondente aos filtros aplicados.
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map(booking => (
                    <tr key={booking.id} className="hover:bg-neutral-50/30 dark:hover:bg-neutral-900/10 transition-colors">
                      {/* Client */}
                      <td className="p-4 pl-6">
                        <div>
                          <p className="font-semibold text-sm text-neutral-800 dark:text-neutral-100">{booking.clientName}</p>
                          <p className="text-xs text-neutral-400">{booking.clientEmail}</p>
                        </div>
                      </td>
                      {/* Service */}
                      <td className="p-4">
                        <span className="font-semibold text-sm text-neutral-800 dark:text-neutral-100">{booking.serviceName}</span>
                      </td>
                      {/* Scheduled At */}
                      <td className="p-4">
                        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                          <Clock className="size-3.5" />
                          <span>{booking.scheduledAt}</span>
                        </div>
                      </td>
                      {/* Price */}
                      <td className="p-4">
                        <span className="font-bold text-xs text-neutral-700 dark:text-neutral-300">
                          {booking.totalPrice.toLocaleString()} AOA
                        </span>
                      </td>
                      {/* Status */}
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          booking.status === "Confirmada" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                          booking.status === "Pendente" ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" :
                          booking.status === "Concluída" ? "bg-indigo-500/10 text-indigo-500 border border-indigo-500/20" :
                          "bg-red-500/10 text-red-500 border border-red-500/20"
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      {/* Actions */}
                      <td className="p-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {booking.status === "Pendente" && (
                            <Button
                              size="sm"
                              className="h-8 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold"
                              onClick={() => handleUpdateStatus(booking.id, "Confirmada")}
                            >
                              <Check className="size-3.5 mr-1" />
                              Confirmar
                            </Button>
                          )}
                          {booking.status === "Confirmada" && (
                            <Button
                              size="sm"
                              className="h-8 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold"
                              onClick={() => handleUpdateStatus(booking.id, "Concluída")}
                            >
                              <CheckCircle className="size-3.5 mr-1" />
                              Concluir
                            </Button>
                          )}
                          {booking.status !== "Concluída" && booking.status !== "Cancelada" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 rounded-xl text-xs font-bold text-red-500 border-red-200 hover:bg-red-50"
                              onClick={() => handleUpdateStatus(booking.id, "Cancelada")}
                            >
                              <XCircle className="size-3.5 mr-1" />
                              Cancelar
                            </Button>
                          )}
                          {(booking.status === "Concluída" || booking.status === "Cancelada") && (
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                              Arquivado
                            </span>
                          )}
                        </div>
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
  );
}
