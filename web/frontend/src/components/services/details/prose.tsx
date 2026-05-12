import { ApiService } from "../../types/service.type";
import { Avatar, Card, Chip, Separator } from "@heroui/react";
import {
  TagIcon,
  StarIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  Squares2X2Icon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

interface ProseProps {
  service: ApiService;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-AO", {
    style: "currency",
    currency: "AOA",
    minimumFractionDigits: 0,
  }).format(value);

const Prose = ({ service }: ProseProps) => {
  return (
    <div className="flex flex-col gap-6 mt-2">
      {/* Descrição */}
      {service.description && (
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-foreground">Descrição</h3>
          <p className="text-sm leading-relaxed text-muted">
            {service.description}
          </p>
        </div>
      )}

      <Separator />

      {/* Estatísticas */}
      <div className="grid grid-cols-3 gap-3">
        <Card
          variant="transparent"
          className="items-center text-center gap-1 py-3"
        >
          <CalendarDaysIcon className="size-5 text-accent" />
          <Card.Header className="gap-0 items-center">
            <Card.Title className="text-xl font-bold">
              {service.totalReservations}
            </Card.Title>
            <Card.Description className="text-xs">Reservas</Card.Description>
          </Card.Header>
        </Card>

        <Card
          variant="transparent"
          className="items-center text-center gap-1 py-3"
        >
          <StarIcon className="size-5 text-warning" />
          <Card.Header className="gap-0 items-center">
            <Card.Title className="text-xl font-bold">
              {service.totalFavorites}
            </Card.Title>
            <Card.Description className="text-xs">Favoritos</Card.Description>
          </Card.Header>
        </Card>

        <Card
          variant="transparent"
          className="items-center text-center gap-1 py-3"
        >
          <CurrencyDollarIcon className="size-5 text-success" />
          <Card.Header className="gap-0 items-center">
            <Card.Title className="text-xl font-bold text-success">
              {formatCurrency(service.totalEarnings)}
            </Card.Title>
            <Card.Description className="text-xs">Receita</Card.Description>
          </Card.Header>
        </Card>
      </div>

      <Separator />

      {/* Categoria */}
      <div className="flex flex-col gap-2 items-start">
        <div className="flex items-center gap-2">
          <Squares2X2Icon className="size-4 text-muted" />
          <h3 className="text-sm font-semibold text-foreground">Categoria</h3>
        </div>
        <Chip color="accent" variant="primary">
          <Chip.Label>{service.category}</Chip.Label>
        </Chip>
      </div>

      {/* Tags */}
      {service.tags.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <TagIcon className="size-4 text-muted" />
            <h3 className="text-sm font-semibold text-foreground">Tags</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <Chip key={tag} variant="secondary" size="sm">
                <Chip.Label>{tag}</Chip.Label>
              </Chip>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Prose;
