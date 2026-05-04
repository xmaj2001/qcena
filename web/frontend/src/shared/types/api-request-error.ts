import { ApiResponseError, ErrorResponse } from "./api.types";

export class ApiRequestError extends Error {
  private readonly _code: number;
  private readonly _message: string;
  private readonly _path: string;
  private readonly _ts: string;

  constructor(response: ApiResponseError<ErrorResponse>) {
    super(response.data.message);
    this.name = "ApiRequestError";
    this._code = response.data.code;
    this._message = response.data.message;
    this._path = response.path;
    this._ts = response.ts;
  }

  get code(): number {
    return this._code;
  }

  get message(): string {
    return this._message;
  }

  get path(): string {
    return this._path;
  }

  get ts(): string {
    return this._ts;
  }

  isNotFoundError(): boolean {
    return this._code === 404;
  }

  isUnauthorizedError(): boolean {
    return this._code === 401;
  }

  isForbiddenError(): boolean {
    return this._code === 403;
  }

  isServerError(): boolean {
    return this._code === 500;
  }
}
