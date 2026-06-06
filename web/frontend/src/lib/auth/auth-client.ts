import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react
import { oneTapClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  plugins: [
    oneTapClient({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      autoSelect: true,
      cancelOnTapOutside: false,
      context: "signin",
      promptOptions: {
        baseDelay: 3000,
        maxAttempts: 5,
      },
    }),
  ],
});
