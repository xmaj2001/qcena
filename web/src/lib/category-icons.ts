import { Laptop, Shirt, Sparkles, Watch, type LucideIcon } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  shirt: Shirt,
  sparkles: Sparkles,
  laptop: Laptop,
  watch: Watch,
};

export function getCategoryIcon(name: string): LucideIcon {
  return icons[name] ?? Laptop;
}
