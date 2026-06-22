"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
// Simple premium inline progress bar component
function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={`w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden ${className || ""}`}>
      <div
        className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

import { toast } from "sonner";
import {
  FileChartColumn,
  TrendingUp,
  Download,
  Calendar,
  Layers,
  Heart,
  Users,
  AlertCircle,
  FileText,
  Sheet as SheetIcon,
  Globe,
  Database,
  RefreshCw,
  FolderDown,
  CheckCircle2,
  Bookmark,
  Sparkles,
} from "lucide-react";

// Mock metrics matching the Dashboard Analytics.md specifications
const serviceMetrics = {
  topService: { name: "Corte de Cabelo Premium", bookings: 32, revenue: 480000, trend: "+12%" },
  bottomService: { name: "Depilação Corporal Masculina", bookings: 2, revenue: 16000, trend: "-4%" },
  favoritismIndex: [
    { service: "Corte de Cabelo Premium", index: 95, color: "bg-primary" },
    { service: "Massagem Terapêutica", index: 82, color: "bg-indigo-500" },
    { service: "Barba & Toalha Quente", index: 65, color: "bg-amber-500" },
    { service: "Selagem Capilar", index: 30, color: "bg-neutral-400" },
  ],
};

const clientVolumeMetrics = {
  topClient: { name: "Xavier Jose", bookings: 15, totalSpent: 485000, rank: "GOLD" },
  bottomClient: { name: "Dennis Gleichner", bookings: 5, totalSpent: 35000, rank: "SILVER" },
};

const mockServicesDetails = [
  {
    name: "Corte de Cabelo Premium",
    favoritismPosition: "#1 Geral",
    totalBookings: { completed: 28, canceled: 3, pending: 1 },
    revenue: 480000,
    uniqueClients: 18,
  },
  {
    name: "Massagem Terapêutica",
    favoritismPosition: "#2 Geral",
    totalBookings: { completed: 18, canceled: 1, pending: 2 },
    revenue: 380000,
    uniqueClients: 12,
  },
  {
    name: "Barba & Toalha Quente",
    favoritismPosition: "#3 Geral",
    totalBookings: { completed: 14, canceled: 2, pending: 0 },
    revenue: 84000,
    uniqueClients: 9,
  },
];

export default function AnalisePage() {
  const [period, setPeriod] = useState<"semanal" | "mensal" | "anual">("mensal");
  const [selectedFormat, setSelectedFormat] = useState<"pdf" | "excel" | "google_sheets" | "obsidian" | "csv">("pdf");
  
  // Non-contiguous export period selection state (User Manual Export example: Weeks 1, 3, 5 checked)
  const [weeksSelection, setWeeksSelection] = useState<Record<string, boolean>>({
    "Semana 1 (Ativa)": true,
    "Semana 2": false,
    "Semana 3 (Ativa)": true,
    "Semana 4": false,
    "Semana 5 (Ativa)": true,
  });

  const [exportProgress, setExportProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [selectedServiceDetail, setSelectedServiceDetail] = useState(mockServicesDetails[0]);

  const handleWeekToggle = (week: string) => {
    setWeeksSelection(prev => ({
      ...prev,
      [week]: !prev[week],
    }));
  };

  const handleTriggerExport = () => {
    // Check if at least one period is selected
    const selectedWeeks = Object.keys(weeksSelection).filter(w => weeksSelection[w]);
    if (selectedWeeks.length === 0) {
      toast.error("Por favor, selecione pelo menos uma semana para exportação!");
      return;
    }

    setIsExporting(true);
    setExportProgress(0);

    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExporting(false);
            toast.success(`Relatório em ${selectedFormat.toUpperCase()} exportado com sucesso! (${selectedWeeks.length} semanas incluídas)`);
          }, 400);
          return 100;
        }
        return prev + 20;
      });
    }, 200);
  };

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 lg:p-10 bg-neutral-50/50 dark:bg-neutral-950/20 min-h-screen">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileChartColumn className="h-5 w-5 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Auditoria de Desempenho</span>
          </div>
          <h1 className="text-3xl font-display font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
            Análises & Relatórios
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Acompanhe o favoritismo de serviços, volume transacionado por cliente e exporte relatórios granulares não-contíguos.
          </p>
        </div>

        {/* Period Selector (Dashboard Analytics.md) */}
        <div className="flex bg-neutral-100 dark:bg-neutral-900 p-1 rounded-xl w-fit border border-neutral-200 dark:border-neutral-800">
          <Button
            variant={period === "semanal" ? "default" : "ghost"}
            size="sm"
            onClick={() => setPeriod("semanal")}
            className="rounded-lg text-xs font-bold h-8 px-4"
          >
            Semanal
          </Button>
          <Button
            variant={period === "mensal" ? "default" : "ghost"}
            size="sm"
            onClick={() => setPeriod("mensal")}
            className="rounded-lg text-xs font-bold h-8 px-4"
          >
            Mensal
          </Button>
          <Button
            variant={period === "anual" ? "default" : "ghost"}
            size="sm"
            onClick={() => setPeriod("anual")}
            className="rounded-lg text-xs font-bold h-8 px-4"
          >
            Anual
          </Button>
        </div>
      </div>

      {/* 📊 Metrics Section (Dashboard Analytics.md specifications) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Métricas de Clientes Card */}
        <Card className="border-neutral-100 dark:border-neutral-800/80 shadow-xs">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-extrabold text-neutral-450 uppercase tracking-wider flex items-center gap-2">
              <Users className="size-4 text-primary" />
              Métricas de Clientes ({period})
            </CardTitle>
            <CardDescription className="text-xs">Faturamento acumulado e frequência de reservas.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-wider">Cliente que mais reserva (Top 1)</span>
                <p className="font-bold text-sm text-neutral-800 dark:text-neutral-100 mt-1">{clientVolumeMetrics.topClient.name}</p>
                <p className="text-[10px] text-neutral-450 mt-0.5">Rank {clientVolumeMetrics.topClient.rank}</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-extrabold text-emerald-500">{clientVolumeMetrics.topClient.bookings} agendamentos</span>
                <p className="text-[10px] text-neutral-400 font-mono mt-0.5">{clientVolumeMetrics.topClient.totalSpent.toLocaleString()} AOA</p>
              </div>
            </div>

            <div className="p-4 bg-neutral-100/40 dark:bg-neutral-900/30 border border-neutral-200/50 dark:border-neutral-800 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Cliente que menos reserva (Bottom)</span>
                <p className="font-bold text-sm text-neutral-850 dark:text-neutral-200 mt-1">{clientVolumeMetrics.bottomClient.name}</p>
                <p className="text-[10px] text-neutral-450 mt-0.5">Rank {clientVolumeMetrics.bottomClient.rank}</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400">{clientVolumeMetrics.bottomClient.bookings} agendamentos</span>
                <p className="text-[10px] text-neutral-400 font-mono mt-0.5">{clientVolumeMetrics.bottomClient.totalSpent.toLocaleString()} AOA</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Métricas de Serviços Card */}
        <Card className="border-neutral-100 dark:border-neutral-800/80 shadow-xs">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-extrabold text-neutral-450 uppercase tracking-wider flex items-center gap-2">
              <Heart className="size-4 text-indigo-500" />
              Favoritismo & Volume de Serviços
            </CardTitle>
            <CardDescription className="text-xs">Índice de atratividade calculado por agendamento concluído.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-indigo-500/5 border border-indigo-500/10 rounded-xl">
                <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-wider">Serviço mais reservado</span>
                <p className="font-bold text-xs text-neutral-800 dark:text-neutral-100 mt-1 truncate">{serviceMetrics.topService.name}</p>
                <Badge className="bg-indigo-500/20 text-indigo-500 text-[9px] mt-1.5">{serviceMetrics.topService.bookings}x reservado</Badge>
              </div>
              <div className="p-3 bg-neutral-100/40 dark:bg-neutral-900/30 border border-neutral-200/50 dark:border-neutral-800 rounded-xl">
                <span className="text-[9px] font-bold text-neutral-450 uppercase tracking-wider">Serviço menos reservado</span>
                <p className="font-bold text-xs text-neutral-805 dark:text-neutral-200 mt-1 truncate">{serviceMetrics.bottomService.name}</p>
                <Badge className="bg-neutral-100 text-neutral-500 text-[9px] mt-1.5">{serviceMetrics.bottomService.bookings}x reservado</Badge>
              </div>
            </div>

            {/* Favoritism Index List */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Distribuição do Índice de Favoritismo:</span>
              <div className="space-y-2">
                {serviceMetrics.favoritismIndex.map(idx => (
                  <div key={idx.service} className="space-y-1">
                    <div className="flex justify-between text-xs text-neutral-700 dark:text-neutral-300">
                      <span>{idx.service}</span>
                      <span className="font-bold">{idx.index}%</span>
                    </div>
                    <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full ${idx.color} rounded-full`} style={{ width: `${idx.index}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 🔍 Detalhe por Serviço Workspace */}
      <Card className="border-neutral-100 dark:border-neutral-800/80 shadow-xs">
        <CardHeader>
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Layers className="size-4 text-primary" />
            Auditar Detalhes por Serviço Específico
          </CardTitle>
          <CardDescription className="text-xs">
            Selecione um serviço para analisar receita acumulada, clientes recorrentes e taxa de cancelamentos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Quick Select Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {mockServicesDetails.map(svc => (
              <Button
                key={svc.name}
                variant={selectedServiceDetail.name === svc.name ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedServiceDetail(svc)}
                className="rounded-lg text-xs font-bold"
              >
                {svc.name}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
            <div className="p-4 bg-neutral-50 dark:bg-neutral-900/30 border border-neutral-100 dark:border-neutral-800 rounded-xl">
              <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">Índice de Favoritismo</span>
              <span className="text-lg font-extrabold text-indigo-500 block mt-1.5">{selectedServiceDetail.favoritismPosition}</span>
              <p className="text-[10px] text-neutral-450 mt-1">Classificação Geral na Plataforma</p>
            </div>
            <div className="p-4 bg-neutral-50 dark:bg-neutral-900/30 border border-neutral-100 dark:border-neutral-800 rounded-xl">
              <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">Receita Acumulada</span>
              <span className="text-lg font-extrabold text-neutral-800 dark:text-neutral-100 block mt-1.5">
                {selectedServiceDetail.revenue.toLocaleString()} AOA
              </span>
              <p className="text-[10px] text-neutral-450 mt-1">Valor integral liquidado</p>
            </div>
            <div className="p-4 bg-neutral-50 dark:bg-neutral-900/30 border border-neutral-100 dark:border-neutral-800 rounded-xl">
              <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">Clientes Únicos</span>
              <span className="text-lg font-extrabold text-neutral-800 dark:text-neutral-100 block mt-1.5">
                {selectedServiceDetail.uniqueClients} Clientes
              </span>
              <p className="text-[10px] text-neutral-450 mt-1">Consumo sem duplicados</p>
            </div>
            <div className="p-4 bg-neutral-50 dark:bg-neutral-900/30 border border-neutral-100 dark:border-neutral-800 rounded-xl">
              <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">Divisão de Reservas</span>
              <div className="flex gap-2.5 mt-2.5">
                <div>
                  <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[9px] font-bold">
                    {selectedServiceDetail.totalBookings.completed} ✓
                  </Badge>
                  <p className="text-[8px] text-neutral-400 uppercase text-center mt-1">Done</p>
                </div>
                <div>
                  <Badge className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[9px] font-bold">
                    {selectedServiceDetail.totalBookings.pending} ⌛
                  </Badge>
                  <p className="text-[8px] text-neutral-400 uppercase text-center mt-1">Pend</p>
                </div>
                <div>
                  <Badge className="bg-red-500/10 text-red-500 border border-red-500/20 text-[9px] font-bold">
                    {selectedServiceDetail.totalBookings.canceled} ✕
                  </Badge>
                  <p className="text-[8px] text-neutral-400 uppercase text-center mt-1">Canc</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 📥 EXPORTAÇÃO MANUAL WORKSPACE (Exportação Manual.md & Exportação Automática.md specifications) */}
      <Card className="border-neutral-100 dark:border-neutral-800/80 shadow-xs">
        <CardHeader>
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Download className="size-4 text-primary" />
            Central de Exportação Manual Sob Demanda
          </CardTitle>
          <CardDescription className="text-xs">
            Selecione períodos não-contíguos específicos e exporte seus fechamentos de metas e receitas com auditoria total.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Non-contiguous granular selector (Exportação Manual.md example) */}
          <div className="p-4 bg-neutral-50 dark:bg-neutral-900/35 border rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="size-3.5" />
                Seleção Granular de Períodos (Semanas do Mês Atual)
              </span>
              <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-wider text-primary bg-primary/10 border-primary/20">
                Seleção Não-Contígua Ativa
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-1.5">
              {Object.keys(weeksSelection).map(week => (
                <div key={week} className="flex items-center gap-2 bg-white dark:bg-neutral-850 border border-neutral-100 dark:border-neutral-800 rounded-xl px-3.5 py-2">
                  <Checkbox
                    id={week}
                    checked={weeksSelection[week]}
                    onCheckedChange={() => handleWeekToggle(week)}
                  />
                  <label htmlFor={week} className="text-xs font-bold text-neutral-750 dark:text-neutral-250 cursor-pointer">
                    {week}
                  </label>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-neutral-450 mt-1">
              *Nota: As semanas marcadas como ativas serão agregadas no mesmo relatório final, excluindo as semanas desmarcadas.
            </p>
          </div>

          {/* Formats Selection */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">Formatos de Relatório Disponíveis:</span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { id: "pdf", name: "Relatório PDF", icon: FileText, desc: "Formatado para Leitura" },
                { id: "excel", name: "Planilha Excel", icon: SheetIcon, desc: "Análise de Fórmulas (.xlsx)" },
                { id: "google_sheets", name: "Google Sheets", icon: Globe, desc: "Exportação Direta em Nuvem" },
                { id: "obsidian", name: "Obsidian (.md)", icon: Database, desc: "Importação Markdown" },
                { id: "csv", name: "Formato CSV", icon: Layers, desc: "Compatibilidade Universal" },
              ].map(format => (
                <button
                  key={format.id}
                  onClick={() => setSelectedFormat(format.id as any)}
                  className={`p-3.5 rounded-xl border text-left flex flex-col justify-between h-24 transition-all duration-200 ${
                    selectedFormat === format.id
                      ? "bg-primary/20 border-primary shadow-xs"
                      : "bg-white dark:bg-neutral-900 border-neutral-150 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
                  }`}
                >
                  <format.icon className={`size-5 ${selectedFormat === format.id ? "text-black" : "text-neutral-400"}`} />
                  <div>
                    <p className="text-xs font-bold text-neutral-800 dark:text-neutral-100">{format.name}</p>
                    <p className="text-[8px] text-neutral-400 mt-0.5 truncate">{format.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <Separator className="bg-neutral-100 dark:bg-neutral-800" />

          {/* Action trigger & simulator progress bar */}
          <div className="space-y-4">
            {isExporting && (
              <div className="space-y-2 animate-in fade-in duration-300">
                <div className="flex justify-between text-xs font-bold text-neutral-500">
                  <span className="flex items-center gap-2">
                    <RefreshCw className="size-3.5 animate-spin text-primary" />
                    Gerando chaves de integridade, assinaturas imutáveis e compilando relatórios...
                  </span>
                  <span>{exportProgress}%</span>
                </div>
                <Progress value={exportProgress} className="h-2 rounded-full" />
              </div>
            )}

            <div className="flex justify-end">
              <Button
                onClick={handleTriggerExport}
                className="bg-primary hover:bg-primary/95 text-black font-bold rounded-xl h-11 px-6 shadow-md shadow-primary/10"
                disabled={isExporting}
              >
                <FolderDown className="size-4 mr-2" />
                Gerar e Exportar Relatório Selecionado
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
