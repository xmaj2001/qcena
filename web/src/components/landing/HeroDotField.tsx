"use client";

import React, { useEffect, useState } from "react";
import DotField from "@/components/ui/DotField"; // ajuste o caminho se necessário

export function HeroDotField() {
  const [colors, setColors] = useState({
    primary: "#000000",
    background: "#ffffff"
  });

  useEffect(() => {
    // Captura as cores computadas reais diretamente das variáveis do seu global.css (Funciona com OKLCH/Dark Mode)
    const rootStyle = getComputedStyle(document.documentElement);
    const primaryColor = rootStyle.getPropertyValue("--primary").trim() || "#000000";
    const bgColor = rootStyle.getPropertyValue("--background").trim() || "#ffffff";

    setColors({
      primary: primaryColor,
      background: bgColor
    });
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-45 dark:opacity-35">
      <DotField
        dotRadius={1.2}
        dotSpacing={16}
        bulgeStrength={70}
        glowRadius={180}
        sparkle={false}
        waveAmplitude={0}
        cursorRadius={400}
        cursorForce={0.12}
        bulgeOnly
        // injeta dinamicamente as suas variáveis semânticas do Tailwind v4
        gradientFrom={colors.primary}
        gradientTo={colors.primary}
        glowColor={colors.background}
      />
    </div>
  );
}