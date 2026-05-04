import type { ApiService } from "../types/service.type";
import { CardService } from "./card-service";

export type ListServicesProps = {
  services: ApiService[];
};

export const ListServices = ({ services }: ListServicesProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <CardService key={service.id} service={service} />
      ))}
    </div>
  );
};
