// ── Dashboard Mock Data ──

export interface KpiData {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  change: number; // percentage change, positive = up, negative = down
}

export const kpiData: KpiData[] = [
  {
    id: "revenue",
    label: "Revenue",
    value: 228441,
    prefix: "",
    suffix: " US$",
    change: 3.3,
  },
  {
    id: "expenses",
    label: "Expenses",
    value: 25108,
    prefix: "",
    suffix: " US$",
    change: -3.3,
  },
  { id: "sales", label: "Sales", value: 458, change: 3.3 },
  {
    id: "profit",
    label: "Profit",
    value: 203133,
    prefix: "",
    suffix: " US$",
    change: 4.1,
  },
];

export interface SalesMetric {
  label: string;
  value: number;
  suffix?: string;
  change: number;
}

export const salesMetrics: SalesMetric[] = [
  { label: "Weekly Sales", value: 28441, suffix: " US$", change: 3.3 },
  { label: "Daily Sales", value: 4063, suffix: " US$", change: 3.3 },
  { label: "Total Sales", value: 278, change: 3.3 },
];

export interface SalesBarData {
  month: string;
  value: number;
}

export const salesBarData: SalesBarData[] = [
  { month: "01", value: 18 },
  { month: "02", value: 45 },
  { month: "03", value: 32 },
  { month: "04", value: 50 },
  { month: "05", value: 22 },
  { month: "06", value: 28 },
  { month: "07", value: 15 },
  { month: "08", value: 35 },
  { month: "09", value: 20 },
  { month: "10", value: 30 },
  { month: "11", value: 42 },
  { month: "12", value: 38 },
];

export interface TrafficDataPoint {
  month: string;
  organic: number;
  paidAds: number;
}

export const trafficData: TrafficDataPoint[] = [
  { month: "Jan", organic: 4000, paidAds: 2400 },
  { month: "Feb", organic: 3000, paidAds: 1398 },
  { month: "Mar", organic: 9800, paidAds: 2000 },
  { month: "Apr", organic: 3908, paidAds: 2780 },
  { month: "May", organic: 4800, paidAds: 1890 },
  { month: "Jun", organic: 3800, paidAds: 2390 },
  { month: "Jul", organic: 7300, paidAds: 3490 },
  { month: "Aug", organic: 8200, paidAds: 4300 },
  { month: "Sep", organic: 9100, paidAds: 5200 },
  { month: "Oct", organic: 12400, paidAds: 7800 },
  { month: "Nov", organic: 15200, paidAds: 9100 },
  { month: "Dec", organic: 11800, paidAds: 7200 },
];

export const trafficSessions = 231856;

export interface Employee {
  id: string;
  name: string;
  email: string;
  avatarColor: string;
  role: string;
  workerType: string;
}

export const employees: Employee[] = [
  {
    id: "#4586936",
    name: "Alex Turner",
    email: "alex@acme.com",
    avatarColor: "bg-emerald-500",
    role: "Product Manager",
    workerType: "Employee",
  },
  {
    id: "#4586937",
    name: "Emma Davis",
    email: "emma@acme.com",
    avatarColor: "bg-pink-500",
    role: "Senior Designer",
    workerType: "Employee",
  },
  {
    id: "#4586933",
    name: "John Smith",
    email: "john@acme.com",
    avatarColor: "bg-violet-500",
    role: "Chief Technology Officer",
    workerType: "Employee",
  },
  {
    id: "#4586932",
    name: "Kate Moore",
    email: "kate@acme.com",
    avatarColor: "bg-sky-500",
    role: "Chief Executive Officer",
    workerType: "Employee",
  },
  {
    id: "#4586931",
    name: "Lucas Brown",
    email: "lucas@acme.com",
    avatarColor: "bg-amber-500",
    role: "Frontend Developer",
    workerType: "Contractor",
  },
  {
    id: "#4586930",
    name: "Sofia Chen",
    email: "sofia@acme.com",
    avatarColor: "bg-rose-500",
    role: "UX Researcher",
    workerType: "Employee",
  },
  {
    id: "#4586929",
    name: "Marcus Lee",
    email: "marcus@acme.com",
    avatarColor: "bg-teal-500",
    role: "Backend Developer",
    workerType: "Employee",
  },
  {
    id: "#4586928",
    name: "Ana Silva",
    email: "ana@acme.com",
    avatarColor: "bg-indigo-500",
    role: "Data Analyst",
    workerType: "Contractor",
  },
];

export const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { id: "orders", label: "Orders", icon: "ShoppingCart" },
  { id: "tracker", label: "Tracker", icon: "Target", badge: "New" },
  { id: "analytics", label: "Analytics", icon: "BarChart3" },
  { id: "settings", label: "Settings", icon: "Settings" },
] as const;

export const navFooterItems = [
  { id: "help", label: "Help & Information", icon: "HelpCircle" },
  { id: "logout", label: "Log out", icon: "LogOut" },
] as const;
