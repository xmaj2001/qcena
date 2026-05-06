"use client";

import { Card, Chip, Dropdown, Button, Label } from "@heroui/react";
import { TrendingUp, Calendar } from "lucide-react";
import { useDashboard } from "../contexts/DashboardContext";

function formatNumber(value: number): string {
  return value.toLocaleString("en-US").replace(/,/g, " ");
}

export function SalesPerformanceChart() {
  const { salesMetricsData, salesBars, dateRange, setDateRange } = useDashboard();
  const maxValue = Math.max(...salesBars.map((d) => d.value));

  return (
    <Card className="animate-fade-up stagger-2">
      <Card.Header className="flex-row items-start justify-between gap-4">
        <Card.Title className="text-base font-semibold">Sales Performance</Card.Title>
        <Dropdown>
          <Button variant="outline" size="sm">
            <Calendar size={14} />
            {dateRange === "Monthly" ? "Last 2 weeks" : dateRange}
          </Button>
          <Dropdown.Popover placement="bottom end">
            <Dropdown.Menu
              selectionMode="single"
              selectedKeys={new Set([dateRange])}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0];
                if (selected) setDateRange(String(selected));
              }}
            >
              <Dropdown.Item id="Weekly" textValue="Weekly">
                <Label>Weekly</Label>
              </Dropdown.Item>
              <Dropdown.Item id="Monthly" textValue="Monthly">
                <Label>Monthly</Label>
              </Dropdown.Item>
              <Dropdown.Item id="Yearly" textValue="Yearly">
                <Label>Yearly</Label>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </Card.Header>

      <Card.Content className="flex flex-col gap-4">
        {/* Metrics row */}
        <div className="metrics-row">
          {salesMetricsData.map((metric) => (
            <div key={metric.label} className="metric-item">
              <div className="flex items-center gap-2">
                <span className="metric-item__value">
                  {formatNumber(metric.value)}{metric.suffix ?? ""}
                </span>
                <Chip size="sm" color="success" variant="soft">
                  <span className="flex items-center gap-0.5 text-xs">
                    <TrendingUp size={10} />
                    {metric.change}%
                  </span>
                </Chip>
              </div>
              <span className="metric-item__label">{metric.label}</span>
            </div>
          ))}
        </div>

        {/* Bar Chart */}
        <div className="flex">
          {/* Y-axis */}
          <div className="chart-y-axis">
            {[60, 40, 20, 0].map((val) => (
              <span key={val} className="chart-y-axis__label">{val}</span>
            ))}
          </div>

          {/* Bars */}
          <div className="bar-chart flex-1">
            {salesBars.map((bar, idx) => (
              <div key={bar.month} className="bar-chart__bar-wrapper">
                <div className="bar-chart__bar-container">
                  <div
                    className="bar-chart__bar"
                    style={{
                      height: `${(bar.value / maxValue) * 100}%`,
                      animationDelay: `${idx * 0.05}s`,
                    }}
                    title={`${bar.month}: ${bar.value}`}
                  />
                </div>
                <span className="bar-chart__label">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
