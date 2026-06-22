import { ClientRank } from './enums/client-rank.enum';

interface ClientProps {
  userId: string;
  name: string;
  avatarUrl: string | null;
  email: string;
  gender: string | null;
  totalCompleted: number;
  totalCanceled: number;
  totalPending: number;
  totalSpent: number;
  rank: ClientRank;
}

/**
 * Entidade de leitura que representa um cliente de um provedor.
 * Não tem tabela própria — é construída a partir de agregações
 * sobre User + Booking + Service.
 */
export class ClientEntity {
  private readonly props: ClientProps;

  private constructor(props: ClientProps) {
    this.props = props;
  }

  static create(props: ClientProps): ClientEntity {
    return new ClientEntity(props);
  }

  // ── Getters ───────────────────────────────────────────────────────────────
  get userId() {
    return this.props.userId;
  }
  get name() {
    return this.props.name;
  }
  get avatarUrl() {
    return this.props.avatarUrl;
  }
  get email() {
    return this.props.email;
  }
  get gender() {
    return this.props.gender;
  }
  get totalCompleted() {
    return this.props.totalCompleted;
  }
  get totalCanceled() {
    return this.props.totalCanceled;
  }
  get totalPending() {
    return this.props.totalPending;
  }
  get totalSpent() {
    return this.props.totalSpent;
  }
  get rank() {
    return this.props.rank;
  }
  get totalBookings() {
    return (
      this.props.totalCompleted +
      this.props.totalCanceled +
      this.props.totalPending
    );
  }

  // ── Cálculo de Score (para ranking) ────────────────────────────────────────
  /**
   * score = (completedBookings × 40) + (totalSpent / 100 × 35)
   *       + (cancelRate_invertida × 15) + (recency × 10)
   *
   * recencyBonus é passado externamente (1 se teve reserva nos últimos 30 dias, 0 caso contrário)
   */
  calculateScore(recencyBonus: number): number {
    const total = this.totalBookings;
    const cancelRate = total > 0 ? this.props.totalCanceled / total : 0;
    const invertedCancelRate = 1 - cancelRate;

    const score =
      this.props.totalCompleted * 40 +
      (this.props.totalSpent / 100) * 35 +
      invertedCancelRate * 15 +
      recencyBonus * 10;

    return Math.round(score * 100) / 100;
  }

  // ── Determinação de Rank por percentil ─────────────────────────────────────
  /**
   * Dado o score deste cliente e todos os scores ordenados desc,
   * determina o rank baseado na posição percentual.
   */
  static determineRank(position: number, totalClients: number): ClientRank {
    if (totalClients === 0) return ClientRank.BRONZE;
    const percentile = (position + 1) / totalClients;
    if (percentile <= 0.1) return ClientRank.GOLD;
    if (percentile <= 0.3) return ClientRank.SILVER;
    return ClientRank.BRONZE;
  }

  // ── Serialização ───────────────────────────────────────────────────────────
  toSummary() {
    return {
      userId: this.props.userId,
      name: this.props.name,
      avatarUrl: this.props.avatarUrl,
      email: this.props.email,
      rank: this.props.rank,
      totalBookings: this.totalBookings,
    };
  }

  toDetails() {
    return {
      userId: this.props.userId,
      name: this.props.name,
      avatarUrl: this.props.avatarUrl,
      gender: this.props.gender,
      totalCompleted: this.props.totalCompleted,
      totalCanceled: this.props.totalCanceled,
      totalPending: this.props.totalPending,
      totalSpent: this.props.totalSpent,
      rank: this.props.rank,
    };
  }
}
