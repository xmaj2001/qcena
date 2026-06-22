"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  User,
  Bell,
  Shield,
  Palette,
  Link2,
  Database,
  Mail,
  Smartphone,
  Globe,
  Key,
  RefreshCw,
  Check,
  ExternalLink,
  Zap,
  Copy,
  Server,
  Cloud,
  CheckCircle2,
} from "lucide-react";

// Simple elegant switch component
function Switch({
  checked,
  onCheckedChange,
  defaultChecked,
}: {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  defaultChecked?: boolean;
}) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked || false);
  const isChecked = checked !== undefined ? checked : internalChecked;

  const handleToggle = () => {
    if (onCheckedChange) {
      onCheckedChange(!isChecked);
    }
    setInternalChecked(!isChecked);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      onClick={handleToggle}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-205 ease-in-out focus:outline-hidden ${
        isChecked ? "bg-primary" : "bg-neutral-250 dark:bg-neutral-800"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white dark:bg-neutral-100 shadow-xs ring-0 transition duration-205 ease-in-out ${
          isChecked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

// Integration list matching user specification and adding MCP/Webhooks
const initialIntegrations = [
  {
    id: "mcp",
    name: "Model Context Protocol (MCP)",
    description: "Expõe acções/dados via SSE para assistentes inteligentes",
    connected: true,
    lastSync: "Ativo agora (comunicação via SSE)",
    isCore: true,
  },
  {
    id: "webhooks",
    name: "Webhooks de Utilizador",
    description: "Dispara eventos para Zapier, n8n, Make ou urls personalizados",
    connected: true,
    lastSync: "10 disparados nas últimas 24h",
    isCore: true,
  },
  {
    id: "google_sheets",
    name: "Google Sheets Sync",
    description: "Exportação automática de relatórios de fechamento",
    connected: true,
    lastSync: "Sincronizado há 5 min",
    isCore: false,
  },
  {
    id: "google_drive",
    name: "Google Drive Backup",
    description: "Salva snapshots imutáveis em pasta selecionada",
    connected: false,
    lastSync: null,
    isCore: false,
  },
];

const notificationSettings = [
  {
    id: "booking_created",
    label: "Novas Reservas (booking.created)",
    description: "Notificar quando um cliente reservar um serviço",
    email: true,
    push: true,
  },
  {
    id: "goal_completed",
    label: "Metas Concluídas (goal.completed)",
    description: "Notificar quando um objetivo de faturamento for atingido",
    email: true,
    push: true,
  },
  {
    id: "payment_received",
    label: "Pagamentos Recebidos (payment.received)",
    description: "Notificar quando a transação for liquidada com sucesso",
    email: true,
    push: false,
  },
  {
    id: "report_exported",
    label: "Relatório Exportado (report.exported)",
    description: "Confirmar a geração de downloads de planilhas",
    email: false,
    push: true,
  },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState(notificationSettings);
  const [integrations, setIntegrations] = useState(initialIntegrations);
  
  // Custom states for MCP / Webhooks settings
  const [webhookUrl, setWebhookUrl] = useState("https://n8n.qcena.com/webhook/active-listener");
  const [webhookSecret, setWebhookSecret] = useState("whsec_QceNa42LuandaSecretToken2026");
  const [mcpApiKey, setMcpApiKey] = useState("mcp_live_42a8b9c10d11e12f13g14h15");
  
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncing, setIsSyncing] = useState<string | null>(null);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Configurações salvas com sucesso!");
    }, 1200);
  };

  const handleSyncIntegration = (id: string) => {
    setIsSyncing(id);
    setTimeout(() => {
      setIsSyncing(null);
      toast.success(`Integração com ${id.toUpperCase()} sincronizada com sucesso!`);
    }, 1000);
  };

  const handleToggleIntegration = (id: string) => {
    setIntegrations(prev =>
      prev.map(item =>
        item.id === id ? { ...item, connected: !item.connected, lastSync: !item.connected ? "Conectado agora" : null } : item
      )
    );
    toast.info("Status da integração modificado!");
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copiado para a área de transferência!`);
  };

  const toggleNotification = (id: string, type: "email" | "push") => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, [type]: !n[type] } : n))
    );
  };

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 lg:p-10 bg-neutral-50/50 dark:bg-neutral-950/20 min-h-screen">
      {/* Header section */}
      <div className="border-b border-neutral-100 dark:border-neutral-800 pb-6">
        <h1 className="text-3xl font-display font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
          Configurações do Sistema
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Gerencie seu perfil de prestador, notificações, webhooks e integre servidores MCP para automação com inteligência artificial.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-1.5 rounded-xl flex flex-wrap gap-1 w-fit">
          <TabsTrigger
            value="profile"
            className="rounded-lg text-xs font-bold px-4 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-850 data-[state=active]:text-primary data-[state=active]:shadow-xs"
          >
            <User className="w-4 h-4 mr-2" />
            Perfil & Preferências
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="rounded-lg text-xs font-bold px-4 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-850 data-[state=active]:text-primary data-[state=active]:shadow-xs"
          >
            <Bell className="w-4 h-4 mr-2" />
            Webhooks & Eventos
          </TabsTrigger>
          <TabsTrigger
            value="integrations"
            className="rounded-lg text-xs font-bold px-4 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-850 data-[state=active]:text-primary data-[state=active]:shadow-xs"
          >
            <Link2 className="w-4 h-4 mr-2" />
            Servidor MCP & Google
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="rounded-lg text-xs font-bold px-4 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-850 data-[state=active]:text-primary data-[state=active]:shadow-xs"
          >
            <Shield className="w-4 h-4 mr-2" />
            Segurança de Acesso
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6 animate-in fade-in duration-300">
          <Card className="border-neutral-100 dark:border-neutral-800/80 shadow-xs">
            <CardHeader>
              <CardTitle className="text-base font-bold">Informações Pessoais</CardTitle>
              <CardDescription>Atualize os detalhes exibidos para os clientes nas reservas.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                  XJ
                </div>
                <div className="space-y-1.5">
                  <Button variant="outline" size="sm" className="rounded-xl h-8 font-semibold text-xs">
                    Mudar Foto de Perfil
                  </Button>
                  <p className="text-[10px] text-neutral-400">JPG, PNG ou GIF. Tamanho máximo de 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Nome Completo</Label>
                  <Input
                    id="firstName"
                    defaultValue="Xavier Jose"
                    className="rounded-xl h-11 border-neutral-200 dark:border-neutral-800 bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-bold text-neutral-500 uppercase tracking-wider">E-mail Profissional</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="xavier@qcena.com"
                    className="rounded-xl h-11 border-neutral-200 dark:border-neutral-800 bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Cargo / Tipo de Conta</Label>
                  <Select defaultValue="manager">
                    <SelectTrigger className="rounded-xl h-11 border-neutral-200 dark:border-neutral-800 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manager">Prestador Individual (Barbearia)</SelectItem>
                      <SelectItem value="salon">Administrador de Salão Completo</SelectItem>
                      <SelectItem value="viewer">Apenas Leitura / Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone" className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Fuso Horário</Label>
                  <Select defaultValue="luanda">
                    <SelectTrigger className="rounded-xl h-11 border-neutral-200 dark:border-neutral-800 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="luanda">Luanda, Angola (WAT • UTC+1)</SelectItem>
                      <SelectItem value="utc">Coordinated Universal Time (UTC)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-neutral-100 dark:border-neutral-800/80 shadow-xs">
            <CardHeader>
              <CardTitle className="text-base font-bold">Preferências Visuais & Locais</CardTitle>
              <CardDescription>Ajuste as configurações globais do aplicativo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Palette className="w-5 h-5 text-neutral-400" />
                  <div>
                    <p className="font-bold text-sm text-neutral-800 dark:text-neutral-200">Suporte a Tema Escuro</p>
                    <p className="text-xs text-neutral-400">Alterna as cores para descansar seus olhos durante a noite</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-2 border-t border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-neutral-400" />
                  <div>
                    <p className="font-bold text-sm text-neutral-800 dark:text-neutral-200">Formato Monetário Principal</p>
                    <p className="text-xs text-neutral-400">Moeda padrão aplicada no fechamento das metas</p>
                  </div>
                </div>
                <Select defaultValue="aoa">
                  <SelectTrigger className="w-[140px] rounded-xl h-9 border-neutral-200 dark:border-neutral-800 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aoa">Kwanza (AOA)</SelectItem>
                    <SelectItem value="usd">Dólar (USD)</SelectItem>
                    <SelectItem value="eur">Euro (EUR)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              className="rounded-xl bg-primary hover:bg-primary/95 text-black font-bold h-11 px-6 shadow-md shadow-primary/10"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Salvando alterações...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Salvar Preferências
                </>
              )}
            </Button>
          </div>
        </TabsContent>

        {/* Webhooks & Notification events tab */}
        <TabsContent value="notifications" className="space-y-6 animate-in fade-in duration-300">
          <Card className="border-neutral-100 dark:border-neutral-800/80 shadow-xs">
            <CardHeader>
              <CardTitle className="text-base font-bold">Endereço do Webhook de Produção</CardTitle>
              <CardDescription>Envie gatilhos JSON automáticos para integradores externos em tempo real.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">URL de Destino</Label>
                <Input
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="rounded-xl h-11 border-neutral-200 dark:border-neutral-800 bg-white"
                  placeholder="https://sua-api.com/webhook"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Segredo de Assinatura (Sign Secret)</Label>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    value={webhookSecret}
                    readOnly
                    className="rounded-xl h-11 border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 font-mono text-xs flex-1"
                  />
                  <Button
                    variant="outline"
                    className="rounded-xl h-11 px-4 text-xs font-bold"
                    onClick={() => copyToClipboard(webhookSecret, "Chave de webhook")}
                  >
                    <Copy className="size-4" />
                  </Button>
                </div>
                <p className="text-[10px] text-neutral-400 mt-1">
                  Use esta chave para verificar a autenticidade dos disparos de webhook em sua aplicação (assinatura via cabeçalho X-Qcena-Signature).
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-neutral-100 dark:border-neutral-800/80 shadow-xs">
            <CardHeader>
              <CardTitle className="text-base font-bold">Eventos Disparadores Disponíveis</CardTitle>
              <CardDescription>Escolha quais gatilhos enviarão dados para a URL acima.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="grid grid-cols-[1fr,100px,100px] gap-4 pb-3 border-b border-neutral-100 dark:border-neutral-800 text-[10px] uppercase font-bold text-neutral-400">
                  <span>Descrição do Evento</span>
                  <span className="text-center flex items-center justify-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    E-mail
                  </span>
                  <span className="text-center flex items-center justify-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5" />
                    Webhook
                  </span>
                </div>
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="grid grid-cols-[1fr,100px,100px] gap-4 py-4 border-b border-neutral-100 dark:border-neutral-800 last:border-0"
                  >
                    <div>
                      <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200">{n.label}</p>
                      <p className="text-xs text-neutral-400 mt-0.5">{n.description}</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <Switch
                        checked={n.email}
                        onCheckedChange={() => toggleNotification(n.id, "email")}
                      />
                    </div>
                    <div className="flex items-center justify-center">
                      <Switch
                        checked={n.push}
                        onCheckedChange={() => toggleNotification(n.id, "push")}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* MCP & Google integrations Tab */}
        <TabsContent value="integrations" className="space-y-6 animate-in fade-in duration-300">
          <Card className="border-neutral-100 dark:border-neutral-800/80 shadow-xs bg-linear-to-tr from-primary/5 to-card">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-primary/20 text-black border-primary/30 text-[9px] font-bold tracking-wider uppercase">
                  Novo Protocolo
                </Badge>
                <Badge className="bg-indigo-500/20 text-indigo-500 border-indigo-500/30 text-[9px] font-bold">
                  SSE STREAM
                </Badge>
              </div>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Server className="size-5 text-indigo-500" />
                Configuração do Model Context Protocol (MCP)
              </CardTitle>
              <CardDescription className="text-xs">
                Seu servidor MCP está ativo no backend em `http://localhost:5000/mcp`. Os agentes de inteligência artificial podem usar as ferramentas disponibilizadas para auditar metas, extrair fechamentos e consultar serviços autonomamente.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Chave de API do Servidor MCP</Label>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    value={mcpApiKey}
                    readOnly
                    className="rounded-xl h-11 border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 font-mono text-xs flex-1"
                  />
                  <Button
                    variant="outline"
                    className="rounded-xl h-11 px-4 text-xs font-bold"
                    onClick={() => copyToClipboard(mcpApiKey, "Chave de acesso MCP")}
                  >
                    <Copy className="size-4" />
                  </Button>
                </div>
              </div>
              <div className="p-3 bg-neutral-50 dark:bg-neutral-950/40 rounded-xl border border-neutral-100 dark:border-neutral-800 text-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-neutral-600 dark:text-neutral-300">Ferramentas de IA ativadas via MCP:</span>
                  <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[9px]">
                    <CheckCircle2 className="size-3 mr-1 inline" /> 6 Tools ativas
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-neutral-400">
                  <div>• get_bookings (Consulta)</div>
                  <div>• get_analytics (Métricas)</div>
                  <div>• get_goals (Metas)</div>
                  <div>• create_goal (Ação)</div>
                  <div>• export_report (Ação)</div>
                  <div>• get_top_clients (Ranks)</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-neutral-100 dark:border-neutral-800/80 shadow-xs">
            <CardHeader>
              <CardTitle className="text-base font-bold">Serviços e Backups Conectados</CardTitle>
              <CardDescription>Habilite o envio automático de relatórios tabulares e backups.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      item.connected
                        ? "bg-neutral-50/50 dark:bg-neutral-900/30 border-neutral-100 dark:border-neutral-800"
                        : "bg-neutral-50/10 border-dashed border-neutral-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            item.connected ? "bg-primary/20 text-black" : "bg-neutral-100 text-neutral-400"
                          }`}
                        >
                          <Zap className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-neutral-800 dark:text-neutral-100">{item.name}</p>
                          <p className="text-xs text-neutral-400">{item.description}</p>
                        </div>
                      </div>
                      <Badge
                        className={`text-[9px] font-bold ${
                          item.connected
                            ? "bg-primary/20 text-black border-primary/30"
                            : "bg-neutral-100 text-neutral-400 border border-neutral-200"
                        }`}
                      >
                        {item.connected ? "Conectado" : "Inativo"}
                      </Badge>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      {item.connected ? (
                        <>
                          <span className="text-[10px] text-neutral-400 font-semibold">
                            {item.lastSync}
                          </span>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 rounded-lg text-xs"
                              onClick={() => handleSyncIntegration(item.id)}
                              disabled={isSyncing === item.id}
                            >
                              <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isSyncing === item.id ? "animate-spin" : ""}`} />
                              Sincronizar
                            </Button>
                            {!item.isCore && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 rounded-lg text-xs text-red-500 hover:text-red-600"
                                onClick={() => handleToggleIntegration(item.id)}
                              >
                                Desconectar
                              </Button>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <span className="text-[10px] text-neutral-400">Não configurado</span>
                          <Button
                            size="sm"
                            className="h-8 rounded-lg bg-primary text-black text-xs font-bold"
                            onClick={() => handleToggleIntegration(item.id)}
                          >
                            Configurar OAuth
                            <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security / password / active sessions Tab */}
        <TabsContent value="security" className="space-y-6 animate-in fade-in duration-300">
          <Card className="border-neutral-100 dark:border-neutral-800/80 shadow-xs">
            <CardHeader>
              <CardTitle className="text-base font-bold">Mudar Senha de Acesso</CardTitle>
              <CardDescription>Garanta a segurança de sua conta atualizando suas chaves regularmente.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="currentPassword text-xs">Senha Atual</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  className="rounded-xl h-11 border-neutral-200 dark:border-neutral-800 bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword text-xs">Nova Senha</Label>
                <Input
                  id="newPassword"
                  type="password"
                  className="rounded-xl h-11 border-neutral-200 dark:border-neutral-800 bg-white"
                />
              </div>
              <Button
                variant="outline"
                className="rounded-xl h-10 px-5 text-xs font-bold mt-2"
                onClick={() => toast.success("Senha atualizada com sucesso!")}
              >
                Atualizar Senha
              </Button>
            </CardContent>
          </Card>

          <Card className="border-neutral-100 dark:border-neutral-800/80 shadow-xs">
            <CardHeader>
              <CardTitle className="text-base font-bold">Dispositivos & Sessões Ativas</CardTitle>
              <CardDescription>Lista de navegadores e locais com sessão autenticada.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { device: "MacBook Pro M3 Max", location: "Luanda, Angola (WAT)", current: true, time: "Agora" },
                  { device: "iPhone 15 Pro", location: "Luanda, Angola (WAT)", current: false, time: "2 horas atrás" },
                ].map((session, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-50/50 dark:bg-neutral-900/30 border border-neutral-100 dark:border-neutral-800"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                          {session.device}
                          {session.current && (
                            <Badge className="ml-2 bg-primary/20 text-black border-primary/30 text-[9px] font-bold">
                              Esta sessão
                            </Badge>
                          )}
                        </p>
                        <p className="text-[10px] text-neutral-400 mt-0.5">
                          {session.location} • {session.time}
                        </p>
                      </div>
                    </div>
                    {!session.current && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600 rounded-lg text-xs"
                        onClick={() => toast.success("Sessão revogada!")}
                      >
                        Revogar
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
