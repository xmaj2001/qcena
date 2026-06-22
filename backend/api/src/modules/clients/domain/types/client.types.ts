import { ClientRank } from '../entities/enums/client-rank.enum';

// ── Resumo simples de um cliente (para listagens) ────────────────────────────
export interface ClientSummary {
  userId: string;
  name: string;
  avatarUrl: string | null;
  email: string;
  rank: ClientRank;
  totalBookings: number;
}

// ── Detalhes completos de um cliente ─────────────────────────────────────────
export interface ClientDetailsData {
  userId: string;
  name: string;
  avatarUrl: string | null;
  gender: string | null;
  favoriteServices: FavoriteServiceData[];
  totalCompleted: number;
  totalCanceled: number;
  totalPending: number;
  totalSpent: number;
  rank: ClientRank;
}

// ── Dados de uma reserva associada a um cliente ──────────────────────────────
export interface ClientBookingData {
  bookingId: string;
  clientId: string;
  clientName: string;
  serviceId: string;
  serviceName: string;
  totalPrice: number;
  status: string;
  createdAt: Date;
}

// ── Serviço favorito de um cliente ───────────────────────────────────────────
export interface FavoriteServiceData {
  serviceId: string;
  serviceName: string;
  category: string;
  timesBooked: number;
}
