import { headers } from "next/headers";

export async function getServerSession() {
  const res = await fetch(`${process.env.API_URL}/api/auth/get-session`, {
    headers: await headers(), // repassa os cookies do browser para o NestJS
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data?.session ?? null;
}
