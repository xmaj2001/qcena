export enum ServiceState {
  ENABLE = "ENABLE",
  DISABLE = "DISABLE",
}

export type ApiService = {
  id: string;
  image: string;
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
  state: ServiceState;
};

export type Service = ApiService;
