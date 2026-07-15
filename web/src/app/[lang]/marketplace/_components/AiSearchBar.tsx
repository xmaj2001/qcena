"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Send, Upload, Sparkles, X, BotIcon } from "lucide-react";

export function AiSearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full px-6 z-50 flex justify-center">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* ================= FASE 1: BOTÃO FLUTUANTE CHAMATIVO ================= */
          <motion.button
            key="fab"
            layoutId="search-container"
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center gap-2.5 h-12 px-5 rounded-full bg-[var(--brand)] text-white shadow-[0_12px_30px_rgba(0,0,0,0.25)] border border-white/10 overflow-hidden"
          >
            {/* Efeito de Ondas (Ping) sutil no fundo para chamar atenção analítica */}
            <span className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-75 pointer-events-none" style={{ animationDuration: '3s' }} />
            
            <Sparkles className="h-5 w-5 animate-pulse text-white" />
            <span className="text-xs font-bold uppercase tracking-wider">Perguntar à IA</span>
          </motion.button>
        ) : (
          /* ================= FASE 2: BARRA DE PESQUISA EXPANDIDA ================= */
          <motion.div
            key="bar"
            layoutId="search-container"
            ref={containerRef}
            animate={{
              maxWidth: isFocused ? "600px" : "520px",
              scale: isFocused ? 1.01 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 25,
            }}
            className="w-full rounded-full border border-neutral-200/80 bg-white/95 p-2 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur flex items-center gap-2 dark:bg-neutral-900/95 dark:border-neutral-800"
          >
            {/* Botão de Fechar / Minimizar */}
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setIsFocused(false);
              }}
              className="h-9 w-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors dark:hover:bg-neutral-800"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Botão de Upload (Usando Primary) */}
            <button
              type="button"
              className="h-9 w-9 rounded-full bg-[var(--brand)] text-white grid place-items-center hover:opacity-90 transition-opacity shadow-sm"
            >
              <BotIcon className="h-4 w-4" />
            </button>

            {/* Campo de Texto */}
            <input
              type="text"
              autoFocus
              placeholder="Explorar ficheiros ou pedir métricas com IA..."
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="flex-1 bg-transparent outline-none text-xs font-medium text-neutral-800 placeholder:text-neutral-400 dark:text-neutral-200"
            />

            {/* Botão de Pesquisa Clássica */}
            <button
              type="button"
              className="h-9 w-9 grid place-items-center rounded-full border border-neutral-200 text-neutral-500 hover:bg-neutral-50 transition-colors dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Botão de Envio (Usando Primary) */}
            <button
              type="submit"
              className="h-9 w-9 grid place-items-center rounded-full bg-[var(--brand)] text-white hover:opacity-90 transition-opacity shadow-sm"
            >
              <Send className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}