import { NextRequest } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

export function backendFetch(
  req: NextRequest,
  path: string,
  init?: RequestInit,
) {
  return fetch(`${BACKEND_URL}/${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      // HTTP/2 e Next normalizam para minúsculas: 'cookie'
      cookie: req.headers.get("cookie") ?? "",
      ...init?.headers,
    },
  });
}
