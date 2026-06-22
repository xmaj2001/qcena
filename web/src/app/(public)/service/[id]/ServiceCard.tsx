import { formatPrice } from "@/lib/utils";
import { ApiService } from "@/server/services/types/service.type";
import { Badge } from "@heroui/react";
import { Heart, Calendar } from "lucide-react";
import Link from "next/link";

export function ServiceCard({ service }: { service: ApiService }) {
  const cover = service.images[0];

  return (
    <Link
      href={`/service/${service.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {cover && (
          <img
            src={cover}
            alt={service.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
          {service.category}
        </Badge>
        <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur">
          <Heart className="h-3 w-3 fill-primary text-primary" />{" "}
          {service.totalFavorites}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="line-clamp-2 text-base font-semibold text-foreground group-hover:text-primary">
          {service.name}
        </h3>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {service.provider.image && (
            <img
              src={service.provider.image}
              alt=""
              className="h-6 w-6 rounded-full object-cover"
            />
          )}
          <span className="truncate">{service.provider.name}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" /> {service.totalReservations}
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              A partir de
            </p>
            <p className="text-lg font-bold text-foreground">
              {formatPrice(service.price)}
            </p>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Ver detalhes
          </span>
        </div>
      </div>
    </Link>
  );
}
