export enum ServiceState {
  ENABLE = "ENABLE",
  DISABLE = "DISABLE",
}

export type ImageService = {
  src: string;
  altText: string;
};

export type ApiService = {
  id: string;
  images: ImageService[];
  name: string;
  description?: string;
  price: number;
  totalReservations: number;
  totalFavorites: number;
  topClients: {
    id: string;
    name: string;
    image?: string;
    totalReservations: number;
  }[];
  totalEarnings: number;
  provider: {
    id: string;
    name: string;
    image?: string;
  };
  category: string;
  tags: string[];
  state: ServiceState;
};

export type Service = ApiService;

export type ServiceCollection = {
  id: string;
  title: string;
  slug: string;
};
