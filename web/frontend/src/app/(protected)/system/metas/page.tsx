"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { toast } from "sonner";
import {
  Sparkles,
  Calendar,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  Users,
  Award,
  BookOpen,
  DollarSign,
  PieChart,
  HelpCircle,
} from "lucide-react";

// Types
interface Goal {
  id: string;
  title: string;
  period: "Diária" | "Semanal" | "Mensal" | "Anual";
  targetAmount: number;
  currentAmount: number;
  isCompleted: boolean;
  completedAt?: string;
  // Immutable Snapshot fields
  snapshot?: {
    totalClients: number;
    topClient: string;
    firstClient: string;
    lastClient: string;
    topService: string;
    bottomService: string;
  };
}

// Initial premium goals list
const initialGoals: Goal[] = [
  {
    id: "g1",
    title: "Meta Diária de Terça-feira",
    period: "Diária",
    targetAmount: 50000,
    currentAmount: 36000,
    isCompleted: false,
  },
  {
    id: "g2",
    title: "Meta Semanal - Foco em Estética",
    period: "Semanal",
    targetAmount: 300000,
    currentAmount: 210000,
    isCompleted: false,
  },
  {
    id: "g3",
    title: "Meta Mensal de Maio",
    period: "Mensal",
    targetAmount: 1500000,
    currentAmount: 1500000,
    isCompleted: true,
    completedAt: "18 de Maio, 17:30",
    snapshot: {
      totalClients: 84,
      topClient: "Afonso de Sousa (12 reservas)",
      firstClient: "Beatriz Gaspar",
      lastClient: "Eduardo Fonseca",
      topService: "Corte de Cabelo Premium",
      bottomService: "Limpeza de Pele Profunda",
    },
  },
  {
    id: "g4",
    title: "Meta Anual 2026 - Crescimento",
    period: "Anual",
    targetAmount: 12000000,
    currentAmount: 4368000,
    isCompleted: false,
  },
];

export default function MetasPage() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [selectedPeriod, setSelectedPeriod] = useState<Goal["period"] | "Todas">("Todas");
  
  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSnapshotOpen, setIsSnapshotOpen] = useState(false);
  const [activeSnapshot, setActiveSnapshot] = useState<Goal["snapshot"] | null>(null);
  
  // Creation form state
  const [newTitle, setNewTitle] = useState("");
  const [newPeriod, setNewPeriod] = useState<Goal["period"]>("Diária");
  const [newTarget, setNewTarget] = useState("");

  // Edit form state
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editTarget, setEditTarget] = useState("");

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newTarget.trim()) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    const targetVal = parseFloat(newTarget);
    if (isNaN(targetVal) || targetVal <= 0) {
      toast.error("Insira um valor de meta válido.");
      return;
    }

    const newGoal: Goal = {
      id: `g_${Date.now()}`,
      title: newTitle,
      period: newPeriod,
      targetAmount: targetVal,
      currentAmount: 0,
      isCompleted: false,
    };

    setGoals(prev => [newGoal, ...prev]);
    toast.success("Meta criada com sucesso!");
    setIsCreateOpen(false);
    
    // Clear state
    setNewTitle("");
    setNewPeriod("Diária");
    setNewTarget("");
  };

  const handleOpenEdit = (goal: Goal) => {
    if (goal.isCompleted) {
      toast.error("Uma meta concluída é imutável e não pode ser editada!");
      return;
    }
    setEditingGoal(goal);
    setEditTitle(goal.title);
    setEditTarget(goal.targetAmount.toString());
    setIsEditOpen(true);
  };

  const handleUpdateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGoal || !editTitle.trim() || !editTarget.trim()) return;

    const targetVal = parseFloat(editTarget);
    if (isNaN(targetVal) || targetVal <= 0) {
      toast.error("Insira um valor válido.");
      return;
    }

    setGoals(prev =>
      prev.map(goal =>
        goal.id === editingGoal.id ? { ...goal, title: editTitle, targetAmount: targetVal } : goal
      )
    );

    toast.success("Meta atualizada com sucesso!");
    setIsEditOpen(false);
    setEditingGoal(null);
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
    toast.success("Meta excluída com sucesso.");
  };

  const handleViewSnapshot = (goal: Goal) => {
    if (goal.snapshot) {
      setActiveSnapshot(goal.snapshot);
      setIsSnapshotOpen(true);
    }
  };

  const handleSimulateBooking = (id: string) => {
    // Simulate incoming bookings adding up to the goal's amount
    setGoals(prev =>
      prev.map(goal => {
        if (goal.id !== id) return goal;
        if (goal.isCompleted) return goal;

        const newAmount = goal.currentAmount + 25000;
        const reached = newAmount >= goal.targetAmount;

        if (reached) {
          toast.success(`Parabéns! A meta "${goal.title}" foi concluída!`);
          return {
            ...goal,
            currentAmount: goal.targetAmount,
            isCompleted: true,
            completedAt: "Hoje, " + new Date().toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }),
            snapshot: {
              totalClients: Math.floor(Math.random() * 20) + 5,
              topClient: "Carlos Manuel (4 reservas)",
              firstClient: "Afonso de Sousa",
              lastClient: "Beatriz Gaspar",
              topService: "Corte de Cabelo Premium",
              bottomService: "Barba & Toalha Quente",
            },
          };
        }

        toast.info(`Progresso adicionado à meta! (+25.000 AOA)`);
        return { ...goal, currentAmount: newAmount };
      })
    );
  };

  const filteredGoals = goals.filter(goal => {
    if (selectedPeriod === "Todas") return true;
    return goal.period === selectedPeriod;
  });

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 lg:p-10 bg-neutral-50/50 dark:bg-neutral-950/20 min-h-screen">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="h-5 w-5 text-primary animate-bounce" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Sistema de Metas</span>
          </div>
          <h1 className="text-3xl font-display font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
            Minhas Metas & Objetivos
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Defina objetivos de receita e analise relatórios de encerramento imutáveis assim que as metas forem alcançadas.
          </p>
        </div>
        <div>
          <Button
            onClick={() => setIsCreateOpen(true)}
            className="rounded-xl bg-primary text-black font-semibold text-xs hover:bg-primary/95 shadow-md shadow-primary/10"
          >
            <Plus className="mr-1.5 size-4" />
            Criar Nova Meta
          </Button>
        </div>
      </div>

      {/* Rules Notice */}
      <Card className="border-neutral-200 bg-neutral-50/20 dark:border-neutral-800 dark:bg-neutral-900/10">
        <CardContent className="p-4 flex gap-3 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
          <HelpCircle className="size-5 text-primary shrink-0" />
          <div>
            <span className="font-bold text-neutral-700 dark:text-neutral-200">Regras de Conclusão:</span> Metas ativas podem ser editadas ou removidas a qualquer momento. Após a conclusão, a meta torna-se <span className="font-bold text-neutral-700 dark:text-neutral-200">imutável</span> e gera automaticamente um Snapshot com dados de performance fechados para auditoria.
          </div>
        </CardContent>
      </Card>

      {/* Period Filter Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {(["Todas", "Diária", "Semanal", "Mensal", "Anual"] as const).map(period => (
          <Button
            key={period}
            variant={selectedPeriod === period ? "default" : "outline"}
            className="rounded-xl text-xs font-semibold h-9 px-4 duration-200"
            onClick={() => setSelectedPeriod(period)}
          >
            {period}
          </Button>
        ))}
      </div>

      {/* Goals listing grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGoals.map(goal => {
          const progressPercent = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));

          return (
            <Card key={goal.id} className="border-neutral-100 dark:border-neutral-800/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-300 relative overflow-hidden">
              {goal.isCompleted && (
                <div className="absolute top-0 right-0 bg-primary/20 text-primary border-l border-b border-primary/25 rounded-bl-xl px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider">
                  Concluída
                </div>
              )}

              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full">
                    {goal.period}
                  </span>
                  <Badge variant="outline" className={`text-[10px] font-bold border-neutral-300 ${goal.isCompleted ? "border-emerald-500/35 bg-emerald-500/5 text-emerald-500" : "bg-neutral-100"}`}>
                    {goal.isCompleted ? "Imutável" : "Ativa"}
                  </Badge>
                </div>
                <CardTitle className="text-base font-bold text-neutral-900 dark:text-neutral-50 mt-3">
                  {goal.title}
                </CardTitle>
                {goal.completedAt && (
                  <CardDescription className="text-xs text-neutral-400">
                    Alcançada em {goal.completedAt}
                  </CardDescription>
                )}
              </CardHeader>

              <CardContent className="pb-4 flex flex-col gap-4">
                {/* Progress bar */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-neutral-400">Progresso</span>
                    <span className="font-extrabold text-neutral-800 dark:text-neutral-100">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 bg-primary`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-950/30 p-3 rounded-xl border border-neutral-100 dark:border-neutral-800 text-xs">
                  <div>
                    <p className="text-neutral-400">Meta Acumulada</p>
                    <p className="font-bold text-neutral-700 dark:text-neutral-200">
                      {goal.currentAmount.toLocaleString()} AOA
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-neutral-400">Objetivo Total</p>
                    <p className="font-bold text-neutral-700 dark:text-neutral-200">
                      {goal.targetAmount.toLocaleString()} AOA
                    </p>
                  </div>
                </div>
              </CardContent>

              <CardContent className="pt-0 pb-4 flex flex-col gap-2">
                {!goal.isCompleted ? (
                  <>
                    <Button
                      onClick={() => handleSimulateBooking(goal.id)}
                      className="w-full rounded-xl bg-primary text-black font-bold text-xs"
                    >
                      Simular Agendamento (+25k AOA)
                    </Button>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <Button
                        variant="outline"
                        className="rounded-xl text-xs font-semibold"
                        onClick={() => handleOpenEdit(goal)}
                      >
                        <Edit2 className="mr-1.5 size-3.5" />
                        Editar Meta
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-xl text-xs font-semibold text-red-500 border-red-200 hover:bg-red-50"
                        onClick={() => handleDeleteGoal(goal.id)}
                      >
                        <Trash2 className="mr-1.5 size-3.5" />
                        Remover
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => handleViewSnapshot(goal)}
                      className="w-full rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs"
                    >
                      <Award className="mr-1.5 size-4" />
                      Visualizar Snapshot Imutável
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full rounded-xl text-xs font-semibold text-red-500 border-red-200 hover:bg-red-50"
                      onClick={() => handleDeleteGoal(goal.id)}
                    >
                      <Trash2 className="mr-1.5 size-3.5" />
                      Remover Meta Concluída
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Creation Modal */}
      <Sheet open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <SheetContent className="max-w-md w-full bg-white dark:bg-neutral-900 border-l border-neutral-100 dark:border-neutral-800 p-6 shadow-xl h-full flex flex-col justify-between overflow-y-auto">
          <form onSubmit={handleCreateGoal} className="flex flex-col gap-6">
            <SheetHeader>
              <SheetTitle className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
                Nova Meta de Vendas
              </SheetTitle>
              <SheetDescription className="text-xs text-neutral-400 mt-1">
                Configure um novo objetivo financeiro para impulsionar suas reservas.
              </SheetDescription>
            </SheetHeader>

            <Separator className="bg-neutral-100 dark:bg-neutral-800" />

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Título da Meta</label>
                <Input
                  placeholder="Ex: Foco Especial de Fim de Semana"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="rounded-xl h-11 border-neutral-200 dark:border-neutral-800 bg-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Período</label>
                <select
                  value={newPeriod}
                  onChange={(e) => setNewPeriod(e.target.value as Goal["period"])}
                  className="rounded-xl h-11 border border-neutral-200 dark:border-neutral-800 bg-white px-3 text-sm focus:outline-hidden"
                >
                  <option value="Diária">Diária</option>
                  <option value="Semanal">Semanal</option>
                  <option value="Mensal">Mensal</option>
                  <option value="Anual">Anual</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Valor do Objetivo (AOA)</label>
                <Input
                  type="number"
                  placeholder="Ex: 150000"
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  className="rounded-xl h-11 border-neutral-200 dark:border-neutral-800 bg-white"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-2">
              <Button type="submit" className="w-full rounded-xl bg-primary text-black font-bold h-11 shadow-xs">
                Confirmar Criação
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full rounded-xl font-bold h-11 border-neutral-300"
                onClick={() => setIsCreateOpen(false)}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Edit Modal */}
      <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
        <SheetContent className="max-w-md w-full bg-white dark:bg-neutral-900 border-l border-neutral-100 dark:border-neutral-800 p-6 shadow-xl h-full flex flex-col justify-between overflow-y-auto">
          <form onSubmit={handleUpdateGoal} className="flex flex-col gap-6">
            <SheetHeader>
              <SheetTitle className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
                Editar Meta Ativa
              </SheetTitle>
              <SheetDescription className="text-xs text-neutral-400 mt-1">
                Altere as configurações do objetivo enquanto ela ainda está ativa.
              </SheetDescription>
            </SheetHeader>

            <Separator className="bg-neutral-100 dark:bg-neutral-800" />

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Título da Meta</label>
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="rounded-xl h-11 border-neutral-200 dark:border-neutral-800 bg-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Valor do Objetivo (AOA)</label>
                <Input
                  type="number"
                  value={editTarget}
                  onChange={(e) => setEditTarget(e.target.value)}
                  className="rounded-xl h-11 border-neutral-200 dark:border-neutral-800 bg-white"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-2">
              <Button type="submit" className="w-full rounded-xl bg-primary text-black font-bold h-11 shadow-xs">
                Salvar Alterações
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full rounded-xl font-bold h-11 border-neutral-300"
                onClick={() => setIsEditOpen(false)}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Snapshot Modal */}
      {activeSnapshot && (
        <Sheet open={isSnapshotOpen} onOpenChange={setIsSnapshotOpen}>
          <SheetContent className="max-w-md w-full bg-white dark:bg-neutral-900 border-l border-neutral-100 dark:border-neutral-800 p-6 shadow-xl h-full flex flex-col justify-between overflow-y-auto">
            <div className="flex flex-col gap-6">
              <SheetHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    Auditoria
                  </span>
                  <Badge variant="outline" className="text-[10px] font-bold border-indigo-500 bg-indigo-500/5 text-indigo-500">
                    Snapshot Imutável
                  </Badge>
                </div>
                <SheetTitle className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
                  Relatório de Encerramento
                </SheetTitle>
                <SheetDescription className="text-xs text-neutral-400 mt-1">
                  Dados consolidados arquivados automaticamente na data de conclusão da meta.
                </SheetDescription>
              </SheetHeader>

              <Separator className="bg-neutral-100 dark:bg-neutral-800" />

              <div className="flex flex-col gap-4">
                {/* Metric 1: Total users */}
                <div className="flex items-center justify-between p-3.5 bg-neutral-50 dark:bg-neutral-950/40 rounded-xl border border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-3">
                    <Users className="size-5 text-indigo-500" />
                    <div>
                      <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Total de Utilizadores</p>
                      <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Clientes únicos que reservaram</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-sm text-neutral-800 dark:text-neutral-100">{activeSnapshot.totalClients}</span>
                </div>

                {/* Metric 2: Top client */}
                <div className="flex items-center justify-between p-3.5 bg-neutral-50 dark:bg-neutral-950/40 rounded-xl border border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-3">
                    <Award className="size-5 text-indigo-500" />
                    <div>
                      <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Cliente Que Mais Reservou</p>
                      <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Líder em volume no período</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-xs text-neutral-800 dark:text-neutral-100 text-right">{activeSnapshot.topClient}</span>
                </div>

                {/* Metric 3: First and Last Client */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-950/40 rounded-xl border border-neutral-100 dark:border-neutral-800">
                    <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Primeiro a Reservar</p>
                    <p className="font-bold text-neutral-800 dark:text-neutral-100 mt-1">{activeSnapshot.firstClient}</p>
                  </div>
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-950/40 rounded-xl border border-neutral-100 dark:border-neutral-800 text-right">
                    <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Último a Reservar</p>
                    <p className="font-bold text-neutral-800 dark:text-neutral-100 mt-1">{activeSnapshot.lastClient}</p>
                  </div>
                </div>

                {/* Metric 4: Top Service */}
                <div className="flex items-center justify-between p-3.5 bg-neutral-50 dark:bg-neutral-950/40 rounded-xl border border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-3">
                    <PieChart className="size-5 text-indigo-500" />
                    <div>
                      <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Serviço Mais Reservado</p>
                      <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Serviço líder em popularidade</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-xs text-neutral-800 dark:text-neutral-100 text-right">{activeSnapshot.topService}</span>
                </div>

                {/* Metric 5: Bottom Service */}
                <div className="flex items-center justify-between p-3.5 bg-neutral-50 dark:bg-neutral-950/40 rounded-xl border border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-3">
                    <BookOpen className="size-5 text-indigo-500" />
                    <div>
                      <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Serviço Menos Reservado</p>
                      <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Menor volume no período</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-xs text-neutral-800 dark:text-neutral-100 text-right">{activeSnapshot.bottomService}</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button
                variant="outline"
                className="w-full rounded-xl font-bold h-11 border-neutral-300"
                onClick={() => setIsSnapshotOpen(false)}
              >
                Fechar Snapshot
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
