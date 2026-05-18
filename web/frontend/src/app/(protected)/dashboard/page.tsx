import { TableServices } from "@/components/services/table-services";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Label,
  SearchField,
  Tab,
  Tabs,
  TextField,
} from "@heroui/react";
import {
  ArrowUpDown,
  Calendar,
  Check,
  Clock,
  Columns3,
  Download,
  MapPin,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 px-12">
      {/* Header */}
      {/* <TopBar /> */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Visão geral dos seus serviços e agendamentos
          </p>
        </div>
        <Link href="/dashboard/create">
          <Button>
            <Check className="mr-2 h-4 w-4" />
            Criar novo Serviço
          </Button>
        </Link>
      </div>

      {/* <ActionsBar /> */}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Serviços
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Reservas Hoje
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Serviços Ativos
            </CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Reservas
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">256</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        {/* <SalesPerformanceChart /> */}
        {/* <TrafficSourceChart /> */}
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Serviços</h2>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filter
            </Button>
            <Button variant="outline">
              <ArrowUpDown className="w-3.5 h-3.5" /> Sort
            </Button>
            <Button variant="outline">
              <Columns3 className="w-3.5 h-3.5" /> Columns
            </Button>
          </div>
          <div className="relative">
            <SearchField name="search">
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input
                  className="w-[280px]"
                  placeholder="Pesquisar..."
                />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
          </div>
        </div>
        <TableServices />
      </div>
    </div>
  );
}
