import { Avatar, Card, Chip, Separator } from "@heroui/react";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import type { ApiService } from "@/server/services/types/service.type";

interface TopClientesProps {
  service: ApiService;
}

export async function TopClientes({ service }: TopClientesProps) {
  return (
    <>
      <Separator />
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <UserGroupIcon className="size-4 text-muted" />
          <h3 className="text-sm font-semibold text-foreground">
            Top Clientes
          </h3>
        </div>
        <div className="flex flex-col gap-2">
          {service.topClients.slice(0, 5).map((client, index) => (
            <Card
              key={client.id}
              variant="transparent"
              className="flex-row items-center justify-between gap-3 p-2 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-muted w-4 text-center">
                  {index + 1}
                </span>
                <Avatar size="sm">
                  {client.image ? (
                    <Avatar.Image alt={client.name} src={client.image} />
                  ) : null}
                  <Avatar.Fallback>
                    {client.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </Avatar.Fallback>
                </Avatar>
                <span className="text-sm text-foreground">{client.name}</span>
              </div>
              <Chip size="sm" color="accent" variant="soft">
                <Chip.Label>{client.totalReservations} reservas</Chip.Label>
              </Chip>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
