"use client";

import { onlineManager } from "@tanstack/react-query";
import { Wifi, WifiOff } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

interface NetworkContextValue {
  isOnline: boolean;
}

const NetworkContext = React.createContext<NetworkContextValue>({
  isOnline: true,
});

export function useNetworkStatus() {
  return React.useContext(NetworkContext);
}

interface NetworkProviderProps {
  children: React.ReactNode;
  dictionary?: {
    offline: string;
    backOnline: string;
  };
}

const DEFAULT_DICTIONARY = {
  offline: "Sem ligação à internet. Algumas ações foram desativadas.",
  backOnline: "Ligação restabelecida!",
};

export function NetworkProvider({
  children,
  dictionary = DEFAULT_DICTIONARY,
}: NetworkProviderProps) {
  const [isOnline, setIsOnline] = React.useState(true);

  React.useEffect(() => {
    const initialStatus =
      typeof navigator !== "undefined" ? navigator.onLine : true;
    setIsOnline(initialStatus);
    onlineManager.setOnline(initialStatus);

    if (!initialStatus) {
      toast.error(dictionary.offline, {
        id: "network-status",
        duration: Infinity,
        icon: <WifiOff className="size-4" />,
      });
    }

    const handleOnline = () => {
      setIsOnline(true);
      onlineManager.setOnline(true);
      toast.dismiss("network-status");
      toast.success(dictionary.backOnline, {
        id: "network-status",
        duration: 4000,
        icon: <Wifi className="size-4" />,
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      onlineManager.setOnline(false);
      toast.dismiss("network-status");
      toast.error(dictionary.offline, {
        id: "network-status",
        duration: Infinity,
        icon: <WifiOff className="size-4" />,
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [dictionary.backOnline, dictionary.offline]);

  return (
    <NetworkContext.Provider value={{ isOnline }}>
      {children}
    </NetworkContext.Provider>
  );
}
