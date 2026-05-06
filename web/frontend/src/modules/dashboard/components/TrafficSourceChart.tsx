"use client";

import { Card } from "@heroui/react";
import { MoreVertical } from "lucide-react";
import { useDashboard } from "../contexts/DashboardContext";

function formatSessions(value: number): string {
  return value.toLocaleString("en-US").replace(/,/g, ",");
}

export function TrafficSourceChart() {
  const { traffic, totalSessions } = useDashboard();

  // Build SVG line paths
  const width = 460;
  const height = 180;
  const padding = { top: 10, right: 10, bottom: 30, left: 40 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const allValues = traffic.flatMap((d) => [d.organic, d.paidAds]);
  const maxVal = Math.max(...allValues);
  const yTicks = [0, 5000, 10000, 15000, 20000];

  const getX = (i: number) => padding.left + (i / (traffic.length - 1)) * chartW;
  const getY = (val: number) => padding.top + chartH - (val / maxVal) * chartH;

  const buildPath = (key: "organic" | "paidAds") => {
    return traffic
      .map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(d[key])}`)
      .join(" ");
  };

  const buildArea = (key: "organic" | "paidAds") => {
    const linePath = traffic
      .map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(d[key])}`)
      .join(" ");
    return `${linePath} L ${getX(traffic.length - 1)} ${padding.top + chartH} L ${getX(0)} ${padding.top + chartH} Z`;
  };

  const organicPath = buildPath("organic");
  const paidPath = buildPath("paidAds");
  const organicArea = buildArea("organic");
  const paidArea = buildArea("paidAds");

  const pathLength = 2000;

  return (
    <Card className="animate-fade-up stagger-3">
      <Card.Header className="flex-row items-start justify-between">
        <div>
          <Card.Title className="text-base font-semibold">Traffic Source</Card.Title>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-4 text-xs" style={{ color: "var(--muted)" }}>
            <span className="flex items-center gap-1.5">
              <span className="legend-dot legend-dot--organic" /> Organic
            </span>
            <span className="flex items-center gap-1.5">
              <span className="legend-dot legend-dot--paid" /> Paid Ads
            </span>
          </div>
          <button type="button" className="table-action-btn" aria-label="More options">
            <MoreVertical size={16} />
          </button>
        </div>
      </Card.Header>

      <Card.Content className="flex flex-col gap-2">
        <div>
          <p className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
            {formatSessions(totalSessions)}
          </p>
          <p className="text-xs" style={{ color: "var(--muted)" }}>Sessions</p>
        </div>

        {/* SVG Line Chart */}
        <svg
          className="line-chart-svg"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Y-axis labels */}
          {yTicks.map((tick) => (
            <g key={tick}>
              <text
                x={padding.left - 6}
                y={getY(tick) + 3}
                textAnchor="end"
                fontSize="9"
                fill="var(--muted)"
              >
                {tick >= 1000 ? `${tick / 1000}k` : tick}
              </text>
              <line
                x1={padding.left}
                y1={getY(tick)}
                x2={width - padding.right}
                y2={getY(tick)}
                stroke="var(--border)"
                strokeWidth="0.5"
                strokeDasharray="4 4"
              />
            </g>
          ))}

          {/* X-axis labels */}
          {traffic.map((d, i) => (
            <text
              key={d.month}
              x={getX(i)}
              y={height - 5}
              textAnchor="middle"
              fontSize="9"
              fill="var(--muted)"
            >
              {d.month}
            </text>
          ))}

          {/* Area fills */}
          <path className="line-chart-area line-chart-area--organic" d={organicArea} />
          <path className="line-chart-area line-chart-area--paid" d={paidArea} />

          {/* Lines */}
          <path
            className="line-chart-path line-chart-path--organic"
            d={organicPath}
            strokeDasharray={pathLength}
            strokeDashoffset={0}
          />
          <path
            className="line-chart-path line-chart-path--paid"
            d={paidPath}
            strokeDasharray={pathLength}
            strokeDashoffset={0}
          />

          {/* Dots */}
          {traffic.map((d, i) => (
            <g key={`dots-${d.month}`}>
              <circle
                cx={getX(i)}
                cy={getY(d.organic)}
                r="3"
                fill="var(--accent)"
                opacity="0.8"
              />
              <circle
                cx={getX(i)}
                cy={getY(d.paidAds)}
                r="3"
                fill="oklch(0.7 0.15 230)"
                opacity="0.8"
              />
            </g>
          ))}
        </svg>
      </Card.Content>
    </Card>
  );
}
