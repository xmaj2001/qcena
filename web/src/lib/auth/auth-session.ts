import { authClient } from "./auth-client";

export async function getServerSession() {
  const session = await authClient.getSession();
  return session.data ?? null;
}
