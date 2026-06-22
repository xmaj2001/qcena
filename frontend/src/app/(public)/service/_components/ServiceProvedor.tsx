import { Avatar, Card, Separator } from "@heroui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import type { ApiService } from "@/server/services/types/service.type";

interface ServiceProvedorProps {
  service: ApiService;
}

export async function ServiceProvedor({ service }: ServiceProvedorProps) {
  return (
    <>
      <Separator />
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <UserCircleIcon className="size-4 text-muted" />
          <h3 className="text-sm font-semibold text-foreground">Provedor</h3>
        </div>
        <Card variant="transparent" className="flex-row items-center gap-3 p-0">
          <Avatar size="md">
            {service.provider.image ? (
              <Avatar.Image
                alt={service.provider.name}
                src={service.provider.image}
              />
            ) : null}
            <Avatar.Fallback>
              {service.provider.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </Avatar.Fallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">
              {service.provider.name}
            </span>
            <span className="text-xs text-muted">Prestador de serviço</span>
          </div>
        </Card>
      </div>
    </>
  );
}
