"use client";
import { Bell, Moon, PanelLeft, Search, Sun, UserPlus } from "lucide-react";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { useAppTheme } from "@/shared/hooks/use-theme";

export default function TopBar() {
  const { theme, toggle } = useAppTheme();

  const handleToggleSidebar = () => {};

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={handleToggleSidebar}>
            <PanelLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">
            Good morning, Kate
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost">
            <Search className="w-[18px] h-[18px]" />
          </Button>
          <Button onClick={toggle} variant="ghost">
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {theme === "dark" ? (
                <Sun className="w-[18px] h-[18px]" />
              ) : (
                <Moon className="w-[18px] h-[18px]" />
              )}
            </motion.div>
          </Button>
          <Button variant="ghost" className="relative">
            <Bell className="w-[18px] h-[18px]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
          </Button>
          <Button variant="ghost" size="sm" className="">
            <UserPlus className="w-4 h-4" />
            Invite
          </Button>
        </div>
      </div>
    </header>
  );
}
