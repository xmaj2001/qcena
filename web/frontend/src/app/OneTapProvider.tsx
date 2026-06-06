"use client"; // ← obrigatório, wy!

import { authClient } from "@/lib/auth/auth-client";
import { useEffect } from "react";

export function OneTapProvider() {
  useEffect(() => {
    const init = async () => {
      const session = await authClient.getSession();

      // Só dispara o One Tap se não estiver logado
      if (!session?.data?.user) {
        authClient.oneTap();
      }
    };

    init();
  }, []);

  return null; // não renderiza nada
}
