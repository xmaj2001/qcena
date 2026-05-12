import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Heart,
  Calendar,
  Share2,
  ChevronLeft,
  Star,
  Trophy,
  TrendingUp,
  Tag,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ServiceCard } from "@/components/ServiceCard";
import { getServiceById, getRelatedServices } from "@/data/mockServices";
import type { ApiService } from "@/types/service";
import { cn } from "@/lib/utils";

type LoaderData = { service: ApiService; related: ApiService[] };

export const Route = createFileRoute("/services/$serviceId")({
  loader: ({ params }): LoaderData => {
    const service = getServiceById(params.serviceId);
    if (!service) throw notFound();
    return { service, related: getRelatedServices(params.serviceId) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.service.name} — Reservar` },
          { name: "description", content: loaderData.service.description ?? loaderData.service.name },
          { property: "og:title", content: loaderData.service.name },
          { property: "og:image", content: loaderData.service.images[0]?.src ?? "" },
        ]
      : [],
  }),
  component: ServiceDetailPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Serviço não encontrado</h1>
        <Link to="/" className="mt-4 inline-block text-primary underline">
          Voltar ao início
        </Link>
      </div>
    </div>
  ),
});

const formatPrice = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

const formatNumber = (value: number) => new Intl.NumberFormat("pt-BR").format(value);

function ServiceDetailPage() {
  const { service, related } = Route.useLoaderData() as LoaderData;
  const [activeImage, setActiveImage] = useState(0);
  const [favorited, setFavorited] = useState(false);

  const images = service.images.slice(0, 4);
  const main = images[activeImage] ?? images[0];

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Top bar */}
      <div className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" /> Voltar
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              aria-label="Compartilhar"
              className="rounded-full"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant={favorited ? "default" : "outline"}
              size="icon"
              aria-label="Favoritar"
              onClick={() => setFavorited((f) => !f)}
              className="rounded-full"
            >
              <Heart className={cn("h-4 w-4", favorited && "fill-current")} />
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8 lg:px-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-primary text-primary-foreground">{service.category}</Badge>
            {service.state === "active" && (
              <Badge variant="outline" className="gap-1 text-emerald-600 border-emerald-600/30">
                <CheckCircle2 className="h-3 w-3" /> Disponível
              </Badge>
            )}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {service.name}
          </h1>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <strong className="text-foreground">
                {((service.totalFavorites / Math.max(service.totalReservations, 1)) * 4 + 1).toFixed(1)}
              </strong>
              ({formatNumber(service.totalReservations)} reservas)
            </span>
            <span className="flex items-center gap-1.5">
              <Heart className="h-4 w-4 text-primary" /> {formatNumber(service.totalFavorites)} favoritos
            </span>
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-6 grid gap-3 lg:grid-cols-4">
          <div className="relative overflow-hidden rounded-2xl lg:col-span-3 aspect-[16/10]">
            {main && (
              <img
                src={main.src}
                alt={main.altText}
                className="h-full w-full object-cover transition"
              />
            )}
          </div>
          <div className="grid grid-cols-4 gap-3 lg:grid-cols-1">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={cn(
                  "relative aspect-square overflow-hidden rounded-xl border-2 transition",
                  i === activeImage
                    ? "border-primary shadow-md shadow-primary/30"
                    : "border-transparent opacity-70 hover:opacity-100",
                )}
              >
                <img src={img.src} alt={img.altText} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            {/* Provider */}
            <Card className="flex items-center gap-4 p-5">
              {service.provider.image ? (
                <img
                  src={service.provider.image}
                  alt={service.provider.name}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-primary"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  {service.provider.name.charAt(0)}
                </div>
              )}
              <div className="flex-1">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Oferecido por
                </p>
                <p className="text-lg font-semibold text-foreground">{service.provider.name}</p>
              </div>
              <Button variant="outline" size="sm">
                Ver perfil
              </Button>
            </Card>

            {/* Description */}
            {service.description && (
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-foreground">Sobre este serviço</h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </section>
            )}

            {/* Tags */}
            {service.tags.length > 0 && (
              <section className="space-y-3">
                <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
                  <Tag className="h-5 w-5 text-primary" /> Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="px-3 py-1 text-sm">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </section>
            )}

            {/* Stats */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">Em números</h2>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                <Card className="p-4">
                  <Calendar className="h-5 w-5 text-primary" />
                  <p className="mt-2 text-2xl font-bold text-foreground">
                    {formatNumber(service.totalReservations)}
                  </p>
                  <p className="text-xs text-muted-foreground">Reservas totais</p>
                </Card>
                <Card className="p-4">
                  <Heart className="h-5 w-5 text-primary" />
                  <p className="mt-2 text-2xl font-bold text-foreground">
                    {formatNumber(service.totalFavorites)}
                  </p>
                  <p className="text-xs text-muted-foreground">Favoritos</p>
                </Card>
                <Card className="p-4">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <p className="mt-2 text-2xl font-bold text-foreground">
                    {formatPrice(service.totalEarnings)}
                  </p>
                  <p className="text-xs text-muted-foreground">Faturamento</p>
                </Card>
              </div>
            </section>

            {/* Top clients */}
            {service.topClients.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
                    <Trophy className="h-5 w-5 text-primary" /> Top clientes
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Os mais fiéis deste serviço
                  </p>
                </div>
                <div className="space-y-2">
                  {service.topClients.map((client, i) => (
                    <Card
                      key={client.id}
                      className="flex items-center gap-4 p-3 transition hover:border-primary/40"
                    >
                      <div
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold",
                          i === 0
                            ? "bg-primary text-primary-foreground"
                            : i === 1
                              ? "bg-primary/30 text-primary"
                              : i === 2
                                ? "bg-primary/15 text-primary"
                                : "bg-muted text-muted-foreground",
                        )}
                      >
                        {i + 1}
                      </div>
                      {client.image ? (
                        <img
                          src={client.image}
                          alt={client.name}
                          className="h-11 w-11 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted font-semibold text-foreground">
                          {client.name.charAt(0)}
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{client.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {client.totalReservations} reservas
                        </p>
                      </div>
                      <div className="hidden items-center gap-1 text-primary sm:flex">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-semibold">Cliente VIP</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Booking sidebar */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-20 space-y-5 p-6 shadow-lg shadow-primary/5">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  A partir de
                </p>
                <p className="text-4xl font-bold text-foreground">
                  {formatPrice(service.price)}
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Categoria</span>
                  <span className="font-medium text-foreground">{service.category}</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Reservas</span>
                  <span className="font-medium text-foreground">
                    {formatNumber(service.totalReservations)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Favoritos</span>
                  <span className="font-medium text-foreground">
                    {formatNumber(service.totalFavorites)}
                  </span>
                </div>
              </div>

              <Button size="lg" className="w-full">
                <Calendar className="mr-2 h-5 w-5" /> Reservar agora
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                Falar com prestador
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Cancelamento gratuito até 24h antes
              </p>
            </Card>
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20 space-y-6">
            <header className="flex items-end justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                  Recomendados
                </p>
                <h2 className="text-2xl font-bold text-foreground lg:text-3xl">
                  Serviços relacionados
                </h2>
              </div>
              <Link to="/" className="hidden text-sm font-semibold text-primary hover:underline sm:block">
                Ver todos →
              </Link>
            </header>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
