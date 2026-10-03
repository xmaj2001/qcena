export interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  ts: string;
}

export interface ApiCursorEnvelope<T> {
  items: T[];
  nextCursor: string;
}

export interface ApiResponseError<T> {
  success: false;
  data: T;
  ts: string;
  path?: string;
}

export interface ErrorResponse {
  code: number;
  message: string;
  fields?: unknown[];
}
