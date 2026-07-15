"use client";

import * as React from "react";
import { History, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Importações Radix/Shadcn UI
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

interface Booking {
  id: string;
  createdAt: string;
  totalPrice: number;
  status: "CONFIRMED" | "PENDING";
}

interface RecentBookingsProps {
  data: Booking[];
}

export function RecentBookings({ data }: RecentBookingsProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="space-y-3">
      <Separator className="bg-border/60" />

      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full border border-border/50 rounded-2xl overflow-hidden bg-neutral-50/20 dark:bg-neutral-900/10 transition-all duration-200"
      >
        {/* Header do Collapsible */}
        <div className="w-full flex items-center justify-between px-4 py-3 bg-neutral-50/40 dark:bg-neutral-900/40">
          <div className="flex items-center gap-2 text-foreground/90">
            <History className="h-4 w-4 text-[var(--brand)]" />
            <span className="text-xs font-bold uppercase tracking-wider">
              O teu histórico recente
            </span>
          </div>
          
          <CollapsibleTrigger
            render={
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground hover:text-foreground transition-colors"
              />
            }
          >
            <ChevronsUpDown className={cn(
              "h-4 w-4 transition-transform duration-200",
              isOpen && "rotate-180"
            )} />
            <span className="sr-only">Toggle history</span>
          </CollapsibleTrigger>
        </div>

        {/* Conteúdo Ocultável/Expansível */}
        <CollapsibleContent className="p-3 border-t border-border/40 bg-card data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
          <div className="rounded-xl border border-border/40 overflow-hidden">
            <Table>
              <TableHeader className="bg-neutral-50/50 dark:bg-neutral-900/50">
                <TableRow>
                  <TableHead className="text-[10px] font-bold tracking-wider uppercase h-10">Data</TableHead>
                  <TableHead className="text-[10px] font-bold tracking-wider uppercase h-10">Estado</TableHead>
                  <TableHead className="text-right text-[10px] font-bold tracking-wider uppercase h-10">Total Investido</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((booking) => (
                  <TableRow 
                    key={booking.id} 
                    className="hover:bg-neutral-50/40 dark:hover:bg-neutral-900/40 border-b border-border/20 last:border-0"
                  >
                    <TableCell className="text-xs font-medium py-3">
                      {new Date(booking.createdAt).toLocaleDateString("pt-PT")}
                    </TableCell>
                    <TableCell className="py-3">
                      <span className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase",
                        booking.status === "CONFIRMED" 
                          ? "bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20" 
                          : "bg-amber-500/10 text-amber-500 dark:bg-amber-500/20"
                      )}>
                        {booking.status === "CONFIRMED" ? "Confirmado" : "Pendente"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-xs font-bold text-foreground py-3">
                      {booking.totalPrice.toLocaleString('pt-PT', { style: 'currency', currency: 'AOA' })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}