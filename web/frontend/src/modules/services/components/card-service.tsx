import Image from "next/image";
import { ApiService } from "../types/service.type";

export type CardServiceProps = {
  service: ApiService;
};

export const CardService = ({ service }: CardServiceProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h1>{service.name}</h1>
      <p>{service.description}</p>
      <Image
        src={service.images[0]}
        alt={service.name}
        width={300}
        height={300}
      />
    </div>
  );
};
