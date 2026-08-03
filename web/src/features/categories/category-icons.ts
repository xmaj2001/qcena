import {
    Shirt,
    Sparkles,
    Laptop,
    Watch,
    Grid,
    LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
    shirt: Shirt,
    sparkles: Sparkles,
    laptop: Laptop,
    watch: Watch,
};

export function getCategoryIcon(iconName: string): LucideIcon {
    return ICON_MAP[iconName] || Grid;
}