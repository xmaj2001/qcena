"use client";

import { useRouter, useParams, usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
    const router = useRouter();
    const params = useParams();
    const pathname = usePathname();
    const lang = (params?.lang as string) || "pt";

    const changeLanguage = (newLang: string) => {
        if (newLang === lang) return;

        const segments = pathname.split("/");
        if (segments[1] === "pt" || segments[1] === "en") {
            segments[1] = newLang;
        } else {
            segments.splice(1, 0, newLang);
        }

        router.push(segments.join("/"));
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" />
                }
            >
                <Globe className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Mudar idioma</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={() => changeLanguage("pt")}
                    className={lang === "pt" ? "font-bold text-[var(--brand)]" : ""}
                >
                    Português (PT)
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => changeLanguage("en")}
                    className={lang === "en" ? "font-bold text-[var(--brand)]" : ""}
                >
                    English (EN)
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}