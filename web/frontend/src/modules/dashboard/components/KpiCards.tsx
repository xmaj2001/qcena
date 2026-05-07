"use client";

import { Card, Chip } from "@heroui/react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useDashboard } from "../contexts/DashboardContext";

function formatNumber(value: number): string {
  return value.toLocaleString("en-US").replace(/,/g, " ");
}

export function KpiCards() {
  const { kpis } = useDashboard();

  return (
    <div className="kpi-grid">
      {kpis.map((kpi, i) => {
        const isPositive = kpi.change >= 0;
        return (
          <Card key={kpi.id} className={`animate-fade-up stagger-${i + 1}`}>
            <Card.Header className="flex-row items-center justify-between">
              <Card.Title
                className="text-sm font-medium"
                style={{ color: "var(--muted)" }}
              >
                {kpi.label}
              </Card.Title>
              <Chip
                size="sm"
                color={isPositive ? "success" : "danger"}
                variant="soft"
              >
                <span className="flex items-center gap-0.5 text-xs font-semibold">
                  {isPositive ? (
                    <TrendingUp size={12} />
                  ) : (
                    <TrendingDown size={12} />
                  )}
                  {Math.abs(kpi.change)}%
                </span>
              </Chip>
            </Card.Header>
            <Card.Content>
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--foreground)" }}
              >
                {kpi.prefix ?? ""}
                {formatNumber(kpi.value)}
                {kpi.suffix ?? ""}
              </p>
            </Card.Content>
          </Card>
        );
      })}
    </div>
  );
}
