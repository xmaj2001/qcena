// import "server-only";
// import { betterFetch } from "@better-fetch/fetch";
// import { headers } from "next/headers";
// import { cache } from "react";

// export type AuthSession = {
//   session: {
//     expiresAt: string;
//     token: string;
//     createdAt: string;
//     updatedAt: string;
//     ipAddress: string;
//     userAgent: string;
//     userId: string;
//     id: string;
//   };
//   user: {
//     name: string;
//     email: string;
//     emailVerified: boolean;
//     image: string | null;
//     createdAt: string;
//     updatedAt: string;
//     id: string;
//   };
// }

// // cache() evita repetir a chamada na mesma requisição (várias Server Components pedindo sessão)
// export const getServerSession = cache(async () => {
//   const cookieHeader = (await headers()).get("cookie") || "";

//   const { data, error } = await betterFetch<AuthSession>("/api/auth/get-session", {
//     baseURL: process.env.BACKEND_URL, // URL do Nest, não do Next
//     headers: {
//       cookie: cookieHeader, // repassa o cookie do betterAuth que está no client
//     },
//   });

//   if (error) return null;
//   return data;
// });