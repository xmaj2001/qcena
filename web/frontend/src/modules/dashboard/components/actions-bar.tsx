"use client";

import { Button, Dropdown, Tabs } from "@heroui/react";
import { Calendar, RefreshCw, Download } from "lucide-react";
import { useState } from "react";

enum Period {
  Daily,
  Weekly,
  Monthly,
  Yearly,
}

enum View {
  Overview,
  Sales,
  Expenses,
}

export function ActionsBar() {
  const [selectedView, setSelectedView] = useState<View>(View.Overview);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(Period.Monthly);
  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs
          className="w-full max-w-md"
          onSelectionChange={(key) => setSelectedView(key as View)}
        >
          <Tabs.ListContainer>
            <Tabs.List aria-label="Options">
              <Tabs.Tab id={View.Overview.toString()}>
                Visão Geral
                <Tabs.Indicator />
              </Tabs.Tab>
              <Tabs.Tab id={View.Sales.toString()}>
                Reservas
                <Tabs.Indicator />
              </Tabs.Tab>
              <Tabs.Tab id={View.Expenses.toString()}>
                Clientes
                <Tabs.Indicator />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>
        </Tabs>

        <div className="flex items-center gap-2">
          <Button isIconOnly variant="secondary" size="sm" aria-label="refresh">
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </Button>

          <Dropdown>
            <Dropdown.Trigger>
              <Button variant="secondary" size="sm">
                <Calendar className="h-4 w-4" />
                {getPeriodLabel(selectedPeriod)}
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <Dropdown.Menu
                aria-label="period"
                selectionMode="single"
                onAction={(key) => setSelectedPeriod(key as Period)}
              >
                <Dropdown.Item aria-label="daily" id={Period.Daily.toString()}>
                  Diário
                </Dropdown.Item>
                <Dropdown.Item
                  aria-label="weekly"
                  id={Period.Weekly.toString()}
                >
                  Semanal
                </Dropdown.Item>
                <Dropdown.Item
                  aria-label="monthly"
                  id={Period.Monthly.toString()}
                >
                  Mensal
                </Dropdown.Item>
                <Dropdown.Item
                  aria-label="yearly"
                  id={Period.Yearly.toString()}
                >
                  Anual
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>

          <Button size="sm">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}

const getPeriodLabel = (period: Period) => {
  switch (period) {
    case Period.Daily:
      return "Diário";
    case Period.Weekly:
      return "Semanal";
    case Period.Monthly:
      return "Mensal";
    case Period.Yearly:
      return "Anual";
  }
};

const getViewLabel = (view: View) => {
  switch (view) {
    case View.Overview:
      return "Visão Geral";
    case View.Sales:
      return "Vendas";
    case View.Expenses:
      return "Despesas";
  }
};
