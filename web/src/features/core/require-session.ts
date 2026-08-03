// // src/api/core/require-session.ts
// import "server-only";
// import { redirect } from "next/navigation";
// import { getServerSession } from "./get-session.server";
// 
// export async function requireSession(callbackUrl: string) {
//   const session = await getServerSession();
//   if (!session) redirect(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
//   return session; // TypeScript já sabe que não é null aqui, por causa do redirect acima
// }