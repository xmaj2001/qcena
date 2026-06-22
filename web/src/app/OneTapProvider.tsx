"use client";

import { useEffect, useRef, useState } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

export function OneTapProvider() {
  const router = useRouter();
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // null = ainda a carregar

  useEffect(() => {
    const init = async () => {
      const session = await authClient.getSession();

      if (session?.data?.user) {
        setIsLoggedIn(true);
        return;
      }

      setIsLoggedIn(false); // não logado → vai mostrar o botão

      // Tenta o prompt em paralelo (pode funcionar ou não)
      authClient
        .oneTap({
          fetchOptions: {
            onSuccess: () => router.push("/dashboard"),
          },
          onPromptNotification: (notification) => {
            console.warn("Prompt notification:", notification);
          },
        })
        .catch(() => {}); // engole o pau do FedCM silenciosamente
    };

    init();
  }, []);

  // Renderiza o botão assim que o ref estiver disponível e o user não estiver logado
  useEffect(() => {
    if (isLoggedIn === false && buttonRef.current) {
      authClient.oneTap({
        button: {
          container: buttonRef.current,
          config: {
            theme: "outline",
            size: "large",
            type: "standard",
            text: "signin_with",
            shape: "rectangular",
            logo_alignment: "left",
            width: 300,
          },
        },
        fetchOptions: {
          onSuccess: () => router.push("/dashboard"),
        },
      });
    }
  }, [isLoggedIn]); // dispara quando isLoggedIn muda para false

  // Ainda a carregar ou já logado → não mostra nada
  if (isLoggedIn !== false) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div ref={buttonRef} />
    </div>
  );
}
