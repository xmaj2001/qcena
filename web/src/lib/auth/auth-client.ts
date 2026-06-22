import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react
import { oneTapClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_URL,

  plugins: [
    oneTapClient({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      autoSelect: true,
      cancelOnTapOutside: false,
      context: "signin",
      promptOptions: {
        baseDelay: 3000,
        maxAttempts: 5,
        fedCM: false, // ← desactiva FedCM, wy!
      },
    }),
  ],
  fetchPlugins: [
    {
      id: "next-cookies-request-plugin",
      name: "next-cookies-request-plugin",
      hooks: {
        async onRequest(ctx) {
          if (typeof window === "undefined") {
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies();
            ctx.headers.set("cookie", cookieStore.toString());
          }
        },
      },
    },
  ],
});
