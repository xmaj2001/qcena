import { Gallery } from "@/components/services/gallery";
import { RelatedServices } from "@/components/services/RelatedServices";
import { ServiceDescription } from "@/components/services/service-description";
import { ServiceNavbar } from "@/components/services/service-navbar";
import { getService } from "@/server/services/features/get-service.feat";
import { Suspense } from "react";
import type { ImageService } from "@/server/services/types/service.type";
import { HeroService } from "@/components/services/hero-service";
import { Avatar, Card, Chip, Separator } from "@heroui/react";
import { UserCircleIcon } from "lucide-react";
import { UserGroupIcon } from "@heroicons/react/24/outline";

interface ServicePageProps {
  params: Promise<{ id: string }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { id } = await params;
  const service = await getService(id);

  if (!service) return <div>Service not found</div>;
  return (
    <div className="min-h-screen text-white relative pt-20" id="place">
      <ServiceNavbar />
      <div className="mx-auto max-w-(--breakpoint-2xl) px-4">
        <div className="flex flex-col rounded-lg bg-white p-8 md:p-12 lg:flex-row lg:gap-8  dark:bg-black">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Suspense fallback={null}>
              <HeroService service={service} />
            </Suspense>

            <div className="flex flex-col gap-4 px-4">
              <Separator />

              {/* Provedor */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <UserCircleIcon className="size-4 text-muted" />
                  <h3 className="text-sm font-semibold text-foreground">
                    Provedor
                  </h3>
                </div>
                <Card
                  variant="transparent"
                  className="flex-row items-center gap-3 p-0"
                >
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
                    <span className="text-xs text-muted">
                      Prestador de serviço
                    </span>
                  </div>
                </Card>
              </div>

              {/* Top Clientes */}
              {service.topClients.length > 0 && (
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
                                <Avatar.Image
                                  alt={client.name}
                                  src={client.image}
                                />
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
                            <span className="text-sm text-foreground">
                              {client.name}
                            </span>
                          </div>
                          <Chip size="sm" color="accent" variant="soft">
                            <Chip.Label>
                              {client.totalReservations} reservas
                            </Chip.Label>
                          </Chip>
                        </Card>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="basis-full lg:basis-2/6">
            <Suspense fallback={null}>
              <ServiceDescription service={service} />
            </Suspense>
          </div>
        </div>
        <RelatedServices id={service.id} />
      </div>
    </div>
  );
}
