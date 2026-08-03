"use client";

import * as React from "react";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
    title: string;
    icon?: React.ReactNode;
}

export const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
    ({ className, title, children, href, icon, ...props }, ref) => {
        return (
            <li>
                <NavigationMenuLink
                    href={href || "#"}
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-2.5 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer",
                        className
                    )}
                    {...props}
                >
                    <div className="flex items-center gap-2 text-xs font-bold leading-none">
                        {icon}
                        {title}
                    </div>
                    <p className="line-clamp-2 text-xs mt-1 leading-snug text-muted-foreground">
                        {children}
                    </p>
                </NavigationMenuLink>
            </li>
        );
    }
);
ListItem.displayName = "ListItem";