import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User } from "lucide-react";

export function ServiceProvedor({ service }: { service: any }) {
  return (
    <div className="space-y-3">
      <Separator className="bg-border/60" />
      <div className="flex items-center gap-2 text-muted-foreground">
        <User className="h-4 w-4" />
        <h3 className="text-xs font-bold uppercase tracking-wider">
          Provedor Autorizado
        </h3>
      </div>

      <Card className="flex flex-row items-center gap-3 p-3 bg-neutral-50/50 dark:bg-neutral-900/30 border border-border/40 rounded-2xl shadow-xs">
        <Avatar className="bg-[var(--brand)] text-white text-xs font-bold">
          <AvatarImage src={service.provider.image || undefined} />
          <AvatarFallback> {service.provider.name}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground tracking-tight">
            {service.provider.name}
          </span>
          <span className="text-xs text-muted-foreground font-medium">
            Prestador Verificado no Ecossistema
          </span>
        </div>
      </Card>
    </div>
  );
}
