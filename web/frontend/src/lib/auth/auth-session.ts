import { ApiUserSession } from "@/server/users/types/user";
import { ApiEnvelope } from "./../../types/api.types";
import { headers } from "next/headers";

export async function getServerSession() {
  const res = await fetch(`${process.env.API_URL}/auth/me`, {
    headers: await headers(), // repassa os cookies do browser para o NestJS
    cache: "no-store", // Isso garante que a cada requisição seja feita uma requisição ao servidor e não utilize o cache
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data as ApiEnvelope<ApiUserSession>;
}
