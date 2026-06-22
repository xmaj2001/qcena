// components/SignInWithGoogle.tsx
"use client";

import { useEffect, useRef } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

export function SignInWithGoogle() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (buttonRef.current) {
      authClient.oneTap({
        button: {
          container: buttonRef.current,
          config: {
            theme: "outline", // "outline" | "filled_blue" | "filled_black"
            size: "large", // "large" | "medium" | "small"
            type: "standard", // "standard" | "icon"
            text: "signin_with", // "signin_with" | "signup_with" | "continue_with"
            shape: "rectangular", // "rectangular" | "pill" | "circle" | "square"
            logo_alignment: "left", // "left" | "center"
            width: 300, // max 400px
          },
        },
        fetchOptions: {
          onSuccess: () => {
            router.push("/dashboard"); // sem hard reload, wy!
          },
        },
      });
    }
  }, []);

  return <div ref={buttonRef} />;
}
