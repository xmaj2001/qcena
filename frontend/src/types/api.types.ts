export interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  ts: string;
}

export interface ApiCursorEnvelope<T> {
  items: T[];
  nextCursor: string;
}

export interface ApiPaginationEnvelope<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
}
export interface ApiResponseError<T> {
  success: boolean;
  data: T;
  ts: string;
  path: string;
}

export type ErrorResponse = {
  code: number;
  message: string;
};

export class ApiNetworkError extends Error {
  private readonly _code: number;
  private readonly _message: string;

  constructor(message: string) {
    super(message);
    this.name = "ApiNetworkError";
    this._code = 503;
    this._message = message;
  }

  get code(): number {
    return this._code;
  }

  get message(): string {
    return this._message;
  }
}
