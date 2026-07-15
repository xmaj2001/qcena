import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trophy } from "lucide-react";

export function TopClientes({ service }: { service: any }) {
  return (
    <div className="space-y-3">
      <Separator className="bg-border/60" />
      <div className="flex items-center gap-2 text-muted-foreground">
        <Trophy className="h-4 w-4 text-amber-500" />
        <h3 className="text-xs font-bold uppercase tracking-wider">
          Top Clientes Recorrentes
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {service.topClients.slice(0, 4).map((client: any, index: number) => (
          <Card
            key={client.id}
            className="flex flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-neutral-50/30 dark:bg-neutral-900/10 border border-border/30 hover:border-border transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-black text-muted-foreground/60 w-4 text-center">
                #{index + 1}
              </span>
              <Avatar className="bg-neutral-200 dark:bg-neutral-800 text-[10px]">
                <AvatarImage src={service.provider.image || undefined} />
                <AvatarFallback> {service.provider.name}</AvatarFallback>
              </Avatar>
              <span className="text-xs font-semibold text-foreground max-w-[120px] truncate">
                {client.name}
              </span>
            </div>
            {/* <Chip
              size="sm"
              color="accent"
              variant="soft"
              className="text-[10px] font-bold"
            >
              {client.totalReservations} ordens
            </Chip> */}
          </Card>
        ))}
      </div>
    </div>
  );
}
