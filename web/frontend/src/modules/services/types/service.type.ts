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
  provider: {
    id: string;
    name: string;
    image?: string;
  };
  category: string;
  client: {
    id: string;
    name: string;
    image?: string;
  };
  state: ServiceState;
};

export type Service = ApiService;
