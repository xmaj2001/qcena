"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import {
  kpiData,
  salesMetrics,
  salesBarData,
  trafficData,
  trafficSessions,
  employees,
  type KpiData,
  type SalesMetric,
  type SalesBarData,
  type TrafficDataPoint,
  type Employee,
} from "../data/mockData";

interface DashboardContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  dateRange: string;
  setDateRange: (range: string) => void;
  kpis: KpiData[];
  salesMetricsData: SalesMetric[];
  salesBars: SalesBarData[];
  traffic: TrafficDataPoint[];
  totalSessions: number;
  employeeList: Employee[];
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState("Monthly");

  return (
    <DashboardContext
      value={{
        activeTab,
        setActiveTab,
        dateRange,
        setDateRange,
        kpis: kpiData,
        salesMetricsData: salesMetrics,
        salesBars: salesBarData,
        traffic: trafficData,
        totalSessions: trafficSessions,
        employeeList: employees,
      }}
    >
      {children}
    </DashboardContext>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
